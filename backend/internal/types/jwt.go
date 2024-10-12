package types

import "github.com/google/uuid"

type JwtAccessParams struct {
	UserID uuid.UUID
	Username string
}

type JwtRefreshParams struct {
	UserID uuid.UUID
}


type JwtAccessParamsDecode struct {
	UserID string `json:"user_id"`
	Exp int64 `json:"exp"`
	Username string `json:"username"`
}

type JwtRefreshParamsDecode struct {
	UserID string `json:"user_id"`
	Exp int64 `json:"exp"`
}