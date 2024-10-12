package types

import (
	"time"

	"github.com/google/uuid"
)

type Message struct {
	Id uuid.UUID `gorm:"primaryKey;not null;default:uuid_generate_v4()"`
	Message string `gorm:"not null"`
	UserId uuid.UUID `gorm:"not null"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"`
	User      User       `gorm:"foreignKey:UserId"`
}

type RequestDataMessage struct {
	UserId string `json:"user_id"`
	Message string `json:"message"`
}

type GetAllMessageResults struct {
	Id uuid.UUID `json:"id"`
	UserId uuid.UUID `json:"user_id"`
	Message string `json:"message"`
	Username string `json:"username"`
}

type ResponseCreateMessage struct{
	Id uuid.UUID `json:"id"`
	Message string `json:"message"`
	UserId uuid.UUID `json:"user_id"`
}

