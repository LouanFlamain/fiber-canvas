package models

import (
	"app/internal/types"

	"github.com/gofiber/fiber/v2"
)

type MessageModelHandler interface {
	AddMessage(*fiber.Ctx)error
	GetAllMessage(*fiber.Ctx)error
}

type MessageModelStore interface {
	AddMessage(types.Message)(types.ResponseCreateMessage,error)
	GetAllMessage()([]types.GetAllMessageResults, error)
}