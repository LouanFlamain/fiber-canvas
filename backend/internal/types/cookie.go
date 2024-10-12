package types

type Cookies struct {
	AccessToken string `cookie:"access_token"`
	RefreshToken string `cookie:"refresh_token"`
}