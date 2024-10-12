package types

import (
	"time"

	"github.com/google/uuid"
)

type User struct{
	Id uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4(); not null"`
	Username string `gorm:"not null;unique"`
	Password string `gorm:"not null"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"`
	Messages []Message `gorm:"foreignKey:UserId"`
}

type RequestDataUser struct{
	Username string `json:"username"`
	Password string `json:"password"`
}