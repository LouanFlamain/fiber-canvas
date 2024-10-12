package utils

import (
	"app/internal/types"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)

func CreateJWTAccessToken(jwtParams types.JwtAccessParams)(string, error){
	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}
	claims := jwt.MapClaims{
		"user_id" : jwtParams.UserID,
		"username" : jwtParams.Username,
		"exp" : time.Now().Add(time.Minute * 15).Unix(),
	}
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	var secret string = os.Getenv("SECRET_ACCESS_TOKEN")

	token, err := t.SignedString([]byte(secret))
	if err != nil {
		return err.Error(), err
	}
	return token, nil
}
func CreateJWTRefreshToken(jwtParams types.JwtRefreshParams)(string, error){
	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}
	claims := jwt.MapClaims{
		"user_id" : jwtParams.UserID,
		"exp" : time.Now().Add(time.Hour * (24 * 7)).Unix(),
	}
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	var secret string = os.Getenv("SECRET_REFRESH_TOKEN")

	token, err := t.SignedString([]byte(secret))
	if err != nil {
		return err.Error(), err
	}
	return token, nil
}

func VerifySignature(jwt string, secret string) (bool) {
    split := strings.Split(jwt, ".")
    if len(split) != 3 {
        return false
    }
    headerPayload := fmt.Sprintf("%v.%v", split[0], split[1])
    signature, err := base64.RawURLEncoding.DecodeString(split[2])
    if err != nil {
        return false
    }
    h := hmac.New(sha256.New, []byte(secret))
    h.Write([]byte(headerPayload))
    expectedSignature := h.Sum(nil)
	fmt.Printf("Signature JWT encodée: %s\n", hex.EncodeToString(signature))
    fmt.Printf("Signature attendue encodée: %s\n", hex.EncodeToString(expectedSignature))
	return hmac.Equal(signature, expectedSignature)
}

func GetJwtUserId(jwt string)(string, error){
	split := strings.Split(jwt, ".")
	payload, err := Base64Decode(split[1])
	if err != nil {
		return "", err
	}
	var structPayloadAccess types.JwtAccessParamsDecode

	err = json.Unmarshal([]byte(payload), &structPayloadAccess)

	if err != nil {
		return "", err
	}
	return structPayloadAccess.UserID, nil
}