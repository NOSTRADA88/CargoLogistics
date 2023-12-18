package router

import (
	"CargoLogisticsServer/handler"
	"github.com/gofiber/fiber/v2"
)

func SetUpRouters(app *fiber.App) {
	app.Get("/:id", handler.GetText)
	app.Get("/", handler.GetTexts)
	app.Post("/", handler.InsertText)
	app.Put("/:id", handler.ChangeText)
	app.Delete("/:id", handler.DeleteText)
}
