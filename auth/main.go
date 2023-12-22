package main

import (
	"auth/handler"
	"auth/router"
	jwtware "github.com/gofiber/contrib/jwt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"log"
	"os"
)

func main() {
	if err := run(); err != nil {
		log.Fatalf("Error occured: %s", err)
	}
}

func run() error {
	app := fiber.New()
	app.Use(
		logger.New(),
		cors.New(cors.Config{
			AllowOrigins: "http://localhost:3000, http://localhost:1338/, http://127.0.0.1:1338",
			AllowHeaders: "Origin, Content-Type, Accept",
			AllowMethods: "GET,POST,PUT,DELETE",
		}))

	router.SetUpRouters(app)

	app.Use(jwtware.New(jwtware.Config{
		SigningKey: jwtware.SigningKey{Key: []byte(os.Getenv("SECRET")), JWTAlg: jwtware.HS256},
	}))

	app.Get("/restricted", handler.Restricted)

	if err := app.Listen(":1338"); err != nil {
		return err
	}
	return nil
}