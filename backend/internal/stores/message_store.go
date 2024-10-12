package stores

import (
	"app/internal/types"

	"gorm.io/gorm"
)

func NewMessageStore(db *gorm.DB)*Store{
	return &Store{
		db,
	}
}

func(s *Store) AddMessage(messageData types.Message)(types.ResponseCreateMessage, error){
	err := s.db.Create(&messageData).Error

	var responseData = types.ResponseCreateMessage{
		Id: messageData.Id,
		Message: messageData.Message,
		UserId: messageData.UserId,
	}

	if err != nil {
		return responseData, err
	}

	return responseData, nil
}

func(s *Store) GetAllMessage()([]types.GetAllMessageResults, error){
	var messageData []types.GetAllMessageResults

    err := s.db.Table("messages").
        Select("messages.id as id, messages.message, messages.user_id, users.username").
        Joins("left join users on users.id = messages.user_id").
        Scan(&messageData).Error
	if err != nil {
		return messageData, err
	}

	return messageData, nil
}