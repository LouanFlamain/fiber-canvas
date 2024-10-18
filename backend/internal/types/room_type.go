package types

import (
	"time"

	"github.com/google/uuid"
)

type Room struct {
	Id uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();"`
	Name string `gorm:"type:varchar(255);not null;"`
	Creator int `gorm:"type:integer;not null;"`
	Participant []int `gorm:"type:integer[];not null"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
	Visibility string `gorm:"type:varchar(255);not null;default:public"`
	UpdatedAT time.Time `gorm:"autoUpdateTime"`
}