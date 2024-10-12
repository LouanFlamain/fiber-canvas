package main

import (
	"app/internal/config"
	"app/internal/database"
	"app/internal/handlers"
	"app/internal/routes"
	"app/internal/socket"
	"app/internal/stores"
	"log"

	"github.com/gofiber/fiber/v2"
)

func main (){
	db := database.InitDB()

	postgresDb, err := db.DB() 

	if err != nil {
		log.Fatal(err)
	}

	defer postgresDb.Close()

	if err != nil {
		log.Fatal(err)
	}

	//Create app
	app := fiber.New()

	//create hub socket
	hub := socket.NewHub()

	//config cors
	config.Cors(app)

	store := stores.CreateStore(db)
	handler := handlers.CreateHandler(store, hub)

	routes.SetUpSocket(app, hub)
	routes.SetUpRoutes(app, handler, store)

	log.Fatal(app.Listen(":3000"))

}