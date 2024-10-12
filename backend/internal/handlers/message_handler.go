package handlers

import (
	"app/internal/socket"
	"app/internal/stores"
	"app/internal/types"
	"app/internal/utils"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func NewMessageHandler(store *stores.StoreStruct, hub *socket.Hub)*Handler{
	return &Handler{
		store,
		hub,
	}
}

func(h *Handler) AddMessage(c *fiber.Ctx)error{
	var requestData types.RequestDataMessage

	cookies := new(types.Cookies)

	err_cookie := c.CookieParser(cookies)
	
	fmt.Printf(cookies.AccessToken)

	if err_cookie != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error" : "error user id",
		})
	}

	userId, err := utils.GetJwtUserId(cookies.AccessToken)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error" : err.Error(),
		})
	}

	if err := c.BodyParser(&requestData); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error" : err,
		})
	}

	if requestData.Message == ""{
		return c.Status(fiber.ErrBadRequest.Code).JSON(fiber.Map{
			"error" : "missing message or user_id",
		})
	}

	uuidParser, err := uuid.Parse(userId)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error" : err,
		})
	}

	var requestMessage = types.Message{
		Message: requestData.Message,
		UserId: uuidParser,
	}

	data, err := h.store.AddMessage(requestMessage)


	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error" : err,
		})
	}

	userReceiver:= "1a42bb1a-bb6f-4eea-83fc-c4ebc3a99acd"

	h.hub.SendMessageToUser(userReceiver, "chat", requestMessage)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data" : data,
	})

	
}

func(h *Handler) GetAllMessage(c *fiber.Ctx)error{
	data, err := h.store.GetAllMessage()

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error" : err,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data" : data,
	})
}