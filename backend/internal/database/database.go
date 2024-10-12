package database

import (
	"app/internal/types"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

  
func InitDB() *gorm.DB{
	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}

	var host = os.Getenv("DB_HOST") //"localhost"
	var port = os.Getenv("DB_PORT") //"5432"
	var user = os.Getenv("DB_USER") //"root"
	var password = os.Getenv("DB_PASSWORD") //"root"
	var db_name = os.Getenv("DB_NAME") //"db_fiber"

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", host, user, password, db_name, port)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal(err)
	}

	db.AutoMigrate(&types.User{})
	db.AutoMigrate(&types.Message{})

	return db
}