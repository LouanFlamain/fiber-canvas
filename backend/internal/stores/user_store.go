package stores

import (
	"app/internal/types"
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func NewUserStore(db *gorm.DB)*Store{
	return &Store{
		db,
	}
}

func(s *Store) AddUser(userData types.User)(types.User, error){
	err := s.db.Create(&userData).Error

	if err != nil {
		return userData, err
	}

	return userData, nil
}

func (s *Store) GetUserById(id string) (types.User, error) {
    var userData types.User

    uuid_id, err := uuid.Parse(id)
    if err != nil {
        fmt.Println("UUID parsing error:", err)
        return userData, fmt.Errorf("invalid UUID format: %v", err)
    }

    fmt.Println("UUID parsed successfully:", uuid_id)

    err = s.db.First(&userData, "id = ?", uuid_id).Error

    if err != nil {
		return userData, err
    }


    fmt.Println("User found:", userData)
    return userData, nil
}

func(s *Store) GetUserByUsername(username string)(types.User, error){
	var user = types.User{
		Username: username,
	}

	err := s.db.First(&user, "username = ?", username).Error

	if err != nil {
		return types.User{}, err
	}

	return user, nil
}