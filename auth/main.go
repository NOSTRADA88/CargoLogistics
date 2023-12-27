package main

import (
	"auth/handler"
	"auth/router"
	jwtware "github.com/gofiber/contrib/jwt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"log"
	"os"
)

func main() {
	if err := run(); err != nil {
		log.Fatalf("Error occured: %s", err)
	}
}

func run() error {
	if err := godotenv.Load("auth.env"); err != nil {
		return err
	}
	app := fiber.New()
	app.Use(
		logger.New(),
		cors.New(cors.Config{
			AllowOrigins: "http://localhost:3000,http://localhost:1338",
			AllowHeaders: "Origin, Content-Type, Accept, Authorization",
			AllowMethods: "GET,POST,PUT,DELETE",
		}))

	router.SetUpRouters(app)

	app.Use(jwtware.New(jwtware.Config{
		SigningKey: jwtware.SigningKey{Key: []byte(os.Getenv("SECRET")), JWTAlg: jwtware.HS256},
	}))

	app.Get("/authorization", handler.Restricted)

	if err := app.Listen(":1338"); err != nil {
		return err
	}
	return nil
}
