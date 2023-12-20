package handler

import (
	"auth/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"os"
	"time"
)

func Login(ctx *fiber.Ctx) error {
	body := new(models.User)
	if err := ctx.BodyParser(&body); err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error":   err,
			"message": "can't parse json",
		})
	}
	if body.Login == os.Getenv("LOGIN_JWT") || body.Password == os.Getenv("PASSWORD_JWT") {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "bad credentials",
		})
	}

	newUUID := uuid.New()
	uuidString := newUUID.String()
	claims := jwt.MapClaims{
		"sub":   uuidString,
		"admin": true,
		"exp":   time.Now().Add(time.Hour * 72).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": err,
		})
	}

	return ctx.Status(200).JSON(fiber.Map{"token": t})
}

func Restricted(ctx *fiber.Ctx) error {
	return ctx.Status(200).JSON(fiber.Map{"authorized": true})
}
