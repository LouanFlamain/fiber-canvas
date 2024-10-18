package routes

import (
	"app/internal/handlers"
	"app/internal/middleware"
	"app/internal/socket"
	"app/internal/stores"

	"github.com/gofiber/fiber/v2"
)

func SetUpRoutes(app *fiber.App, handler *handlers.HandlerStruct, store *stores.StoreStruct){
	api := app.Group("/api")

	// Routes non authentifiées (pas de middleware ici)
	api.Post("/auth", handler.AuthConnect)
	api.Post("/user", handler.AddUser)
	
	// Groupe de routes nécessitant une authentification
	authorized := api.Use(middleware.JwtVerifyMiddleWare(store))

	// Routes authentifiées
	authorized.Get("/user/:id", handler.GetUserById)
	authorized.Get("/message", handler.GetAllMessage)
	authorized.Post("/message", handler.AddMessage)
}

func SetUpSocket(app *fiber.App, hub *socket.Hub){
	app.Use("/ws", socket.SocketUpgrader)
	app.Get("/ws/:token", socket.WebsocketHandler(hub))
}