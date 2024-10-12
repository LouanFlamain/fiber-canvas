package utils

import "encoding/base64"

func Base64Encode(str string) string {
    return base64.RawURLEncoding.EncodeToString([]byte(str))
}

func Base64Decode(str string) (string, error) {
    data, err := base64.RawURLEncoding.DecodeString(str)
    if err != nil {
        return "", err
    }
    return string(data), nil
}