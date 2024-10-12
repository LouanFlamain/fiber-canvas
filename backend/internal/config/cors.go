package config

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func Cors(app *fiber.App){
	godotenv.Load()
	app.Use(cors.New(cors.Config{
		AllowOrigins: os.Getenv("FRONT_END_URL"),
		AllowHeaders: "Origin, Content-Type, Accept",
		AllowCredentials: true,
	}))
}