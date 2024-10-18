package middleware

import (
	"app/internal/stores"
	"app/internal/types"
	"app/internal/utils"
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

// Fonction qui retourne un middleware avec injection de store
func JwtVerifyMiddleWare(store *stores.StoreStruct) fiber.Handler {
	return func(c *fiber.Ctx) error {
		err_env := godotenv.Load()

		if err_env != nil {
			c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error" : "error load .env file",
			})
		}
		// Récupération des cookies

		var valid bool = false

		cookies := new(types.Cookies)
		err := c.CookieParser(cookies)
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "access unauthorized",
			})
		}

		if cookies.AccessToken == "" && cookies.RefreshToken == ""{
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "access unauthorized",
			})
		}


		if cookies.AccessToken == ""{
			valid = false
		}else{
			// Décodage du token
			validAccessToken := utils.VerifySignature(cookies.AccessToken, os.Getenv("SECRET_ACCESS_TOKEN"))

			if !validAccessToken {
				return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
					"error" : "access token compromised",
				})
			}

			split := strings.Split(cookies.AccessToken, ".")
			if len(split) != 3 {
				return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
					"error": "invalid access token format",
				})
			}
	
			payload, err := utils.Base64Decode(split[1])
			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"error": "access token payload decode error",
				})
			}
	
			// Unmarshal du payload
			var structPayload types.JwtAccessParamsDecode
			err = json.Unmarshal([]byte(payload), &structPayload)
			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"error": err.Error(),
				})
			}
	
			if time.Now().Unix() > structPayload.Exp {
				valid = false
			}
		}


		// Vérification de l'expiration du token
		if !valid {
			// Si le token est expiré, vérifiez le refresh token
			if cookies.RefreshToken == "" {
				return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
					"error": "access unauthorized",
				})
			}

			validRefreshToken := utils.VerifySignature(cookies.RefreshToken, os.Getenv("SECRET_REFRESH_TOKEN"))

			if !validRefreshToken {
				return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
					"error" : "refresh token compromised",
				})
			}

			// Décodage du refresh token
			splitRefreshToken := strings.Split(cookies.RefreshToken, ".")
			if len(splitRefreshToken) != 3 {
				return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
					"error": "invalid refresh token format",
				})
			}

			refreshTokenPayload, err := utils.Base64Decode(splitRefreshToken[1])
			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"error": "refresh token payload decode error",
				})
			}

			// Unmarshal du refresh token
			var structPayloadRefresh types.JwtRefreshParamsDecode
			err = json.Unmarshal([]byte(refreshTokenPayload), &structPayloadRefresh)
			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"error": err.Error(),
				})
			}

			// Vérification de l'expiration du refresh token
			if time.Now().Unix() > structPayloadRefresh.Exp {
				return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
					"error": "access unauthorized refresh token expired",
				})
			}

			// Récupération de l'utilisateur en base de données via le store
			data, err := store.GetUserById(structPayloadRefresh.UserID)
			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"error": fmt.Sprintf("failed to get user by id: %s", err.Error()),
				})
			}

			// Répondre avec les données de l'utilisateur
			jwtAccessParamsToken := types.JwtAccessParams{
				UserID: data.Id,
				Username: data.Username,
			}
			accessToken, err := utils.CreateJWTAccessToken(jwtAccessParamsToken)
			
			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"error" : err.Error(),
				})
			}

			accessCookie := fiber.Cookie{
				Name: "access_token",
				Value: accessToken,
				Expires: time.Now().Add(time.Hour * 24),
				HTTPOnly: false,
				Secure: false,
				SameSite: "Lax",
			}

			c.Cookie(&accessCookie)

			return c.Next()
		}

		// Continuer si tout est correct
		return c.Next()
	}
}
