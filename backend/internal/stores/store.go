package stores

import (
	"app/internal/models"

	"gorm.io/gorm"
)

type Store struct{
	db *gorm.DB
}

type StoreStruct struct{
	models.UserModelStore
	models.MessageModelStore
}

func CreateStore(db *gorm.DB)*StoreStruct{
	return &StoreStruct{
		UserModelStore: NewUserStore(db),
		MessageModelStore: NewMessageStore(db),
	}
}