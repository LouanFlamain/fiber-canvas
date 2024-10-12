package handlers

import (
	"app/internal/socket"
	"app/internal/stores"
	"app/internal/types"
	"app/internal/utils"

	"github.com/gofiber/fiber/v2"
)

func NewHandlerUser(store *stores.StoreStruct, hub *socket.Hub)*Handler{
	return &Handler{
		store,
		hub,
	}
}

func (h *Handler)AddUser(c *fiber.Ctx)error{
	var requestData types.RequestDataUser
	err := c.BodyParser(&requestData)

	if requestData.Username == "" || requestData.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error" : "username or password missing",
		})
	}

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error" : err,
		})
	}

	hashedPassword, err := utils.HashPassword(requestData.Password)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error" : err,
		})
	}

	var userData = types.User{
		Username: requestData.Username,
		Password: hashedPassword,
	}

	data, err := h.store.AddUser(userData)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error" : err,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message" : "creation succesfull",
		"data" : fiber.Map{
			"id" : data.Id,
			"username" : data.Username,
		},
	})


}

func(h *Handler) GetUserById(c *fiber.Ctx)error{
	id := c.Params("id")

	data, err := h.store.GetUserById(id)
	

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error" : "error call to database",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"id" : data.Id,
		"username" : data.Username,
		"createdAt" : data.CreatedAt,
		"updatedAt" : data.UpdatedAt,
	})
}