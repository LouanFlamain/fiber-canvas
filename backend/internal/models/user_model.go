package models

import (
	"app/internal/types"

	"github.com/gofiber/fiber/v2"
)

type UserModelHandler interface{
	AddUser(*fiber.Ctx)error
	GetUserById(*fiber.Ctx)error
}

type UserModelStore interface{
	AddUser(types.User)(types.User, error)
	GetUserById(id string)(types.User, error)
	GetUserByUsername(username string)(types.User, error)
}