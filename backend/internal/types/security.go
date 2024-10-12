package types

type AuthSecurityRequest struct{
	Username string `json:"username"`
	Password string `json:"password"`
}

type AuthSecurityResponse struct{
	Username string `json:"username"`
	UserId string `json:"user_id"`
}