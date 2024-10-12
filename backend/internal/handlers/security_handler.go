package handlers

import (
	"app/internal/socket"
	"app/internal/stores"
	"app/internal/types"
	"app/internal/utils"
	"time"

	"github.com/gofiber/fiber/v2"
)

func NewSecurityHandler(store *stores.StoreStruct, hub *socket.Hub)*Handler{
	return &Handler{
		store,
		hub,
	}
}

func(h *Handler)AuthConnect(c *fiber.Ctx)error{
	var requestData types.AuthSecurityRequest
	c.BodyParser(&requestData)

	if requestData.Username == "" || requestData.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error" : "username or password missing",
		})
	}

	data, err := h.store.GetUserByUsername(requestData.Username)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error" : err,
		})
	}

	passwordMatch := utils.CheckPasswordHash(requestData.Password, data.Password)

	if !passwordMatch {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error" : "incorrect password",
		})
	}

	JwtParamsAccessToken :=  types.JwtAccessParams{
		UserID: data.Id,
		Username: data.Username,
	}
	accessToken, err := utils.CreateJWTAccessToken(JwtParamsAccessToken)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error" : err.Error(),
		})
	}

	accessCookie := fiber.Cookie{
		Name: "access_token",
		Value: accessToken,
		Expires: time.Now().Add(time.Hour),
		HTTPOnly: false,
		Secure: false,
		SameSite: "Lax",
	}

	c.Cookie(&accessCookie)

	JwtParamsRefreshToken :=  types.JwtRefreshParams{
		UserID: data.Id,
	}
	refreshToken, err := utils.CreateJWTRefreshToken(JwtParamsRefreshToken)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error" : err.Error(),
		})
	}

	refreshCookie := fiber.Cookie{
		Name: "refresh_token",
		Value: refreshToken,
		Expires: time.Now().Add(time.Hour * 24 * 7),
		HTTPOnly: true,
		Secure: false,
		SameSite: "Lax",
	}

	c.Cookie(&refreshCookie)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data" : &types.AuthSecurityResponse{
			Username: data.Username,
			UserId: data.Id.String(),
		},
	})

}