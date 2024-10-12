package models

import (
	"app/internal/types"

	"github.com/gofiber/fiber/v2"
)

type SecurityModelHandler interface{
	AuthConnect(*fiber.Ctx)error
}

type SecurityModelStore interface {
	AuthConnect(types.AuthSecurityRequest)(types.AuthSecurityResponse, error)
}