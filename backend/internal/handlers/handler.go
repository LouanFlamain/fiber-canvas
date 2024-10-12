package handlers

import (
	"app/internal/models"
	"app/internal/socket"
	"app/internal/stores"
)

type Handler struct {
	store *stores.StoreStruct
	hub *socket.Hub
}

type HandlerStruct struct {
	models.UserModelHandler
	models.MessageModelHandler
	models.SecurityModelHandler
}

func CreateHandler(store *stores.StoreStruct, hub *socket.Hub) *HandlerStruct{
	return &HandlerStruct{
		UserModelHandler: NewHandlerUser(store, hub),
		MessageModelHandler: NewMessageHandler(store, hub),
		SecurityModelHandler: NewSecurityHandler(store, hub),
	}
}