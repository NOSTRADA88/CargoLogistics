package main

import (
	"CargoLogisticsServer/database"
	"CargoLogisticsServer/router"
	"github.com/gofiber/contrib/swagger"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"log"
)

// @title Cargo Logistics API
// @version 1.0
// @description Service provides basic CRUD operations with data which located on website

// @host localhost:1337
func main() {
	if err := run(); err != nil {
		log.Fatalf("REASON: %s", err)
	}

}

func run() error {
	err := database.Init()
	if err != nil {
		return err
	}

	defer database.CloseDB()

	app := fiber.New(fiber.Config{DisablePreParseMultipartForm: true, StreamRequestBody: true})
	app.Use(
		logger.New(),
		swagger.New(swagger.Config{
			BasePath: "/",
			FilePath: "./docs/swagger.yaml",
			Path:     "swagger",
			Title:    "Cargo Logistics API",
		}),
		cors.New(cors.Config{
			AllowOrigins: "http://localhost:3000, http://localhost:1337/, http://127.0.0.1:1337",
			AllowHeaders: "Origin, Content-Type, Accept",
			AllowMethods: "GET,POST,PUT,DELETE",
		}))

	router.SetUpRouters(app)

	if err := app.Listen(":1337"); err != nil {
		return err
	}

	return nil
}
