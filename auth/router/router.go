package router

import (
	"auth/handler"
	"github.com/gofiber/fiber/v2"
)

func SetUpRouters(app *fiber.App) {
	app.Post("/login", handler.Login)
}
