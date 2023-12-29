package handler

import (
	"CargoLogisticsServer/database"
	"CargoLogisticsServer/models"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"mime"
	"net/smtp"
	"os"
)

// InsertText godoc
// @Summary Add a new text
// @Description Add a new text to the collection
// @Tags texts
// @Accept  json
// @Produce  json
// @Param text body CreateDTO true "Text to add"
// @Success 200 {object} map[string]interface{}
// @Failure 400 {object} map[string]string
// @Router / [post]
func InsertText(ctx *fiber.Ctx) error {
	body := new(CreateDTO)
	if err := ctx.BodyParser(body); err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "Invalid body",
		})
	}

	coll := database.GetDBCollection("AllTexts")
	result, err := coll.InsertOne(ctx.Context(), body)
	if err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error":   "Failed to create book",
			"message": err.Error(),
		})
	}

	return ctx.Status(200).JSON(fiber.Map{
		"result":  result,
		"message": "text added successfully",
	})
}

// ChangeText godoc
// @Summary Update text
// @Description Update an existing text by ID
// @Tags texts
// @Accept  json
// @Produce  json
// @Param id path string true "Text ID"
// @Param text body UpdateDTO true "Text data"
// @Success 200 {object} map[string]interface{}
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /{id} [put]
func ChangeText(ctx *fiber.Ctx) error {
	body := new(UpdateDTO)
	if err := ctx.BodyParser(body); err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "Invalid body",
		})
	}
	id := ctx.Params("id")
	if id == "" {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "id is required",
		})
	}

	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "invalid id",
		})
	}
	coll := database.GetDBCollection("AllTexts")
	result, err := coll.UpdateOne(ctx.Context(), bson.M{"_id": objectId}, bson.M{"$set": body})
	if err != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error":   "Failed to update book",
			"message": err.Error(),
		})
	}

	return ctx.Status(200).JSON(fiber.Map{
		"result":  result,
		"message": "text updated successfully",
	})

}

// DeleteText godoc
// @Summary Delete text
// @Description Delete a text by ID
// @Tags texts
// @Accept  json
// @Produce  json
// @Param id path string true "Text ID"
// @Success 200 {object} map[string]interface{}
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /{id} [delete]
func DeleteText(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	if id == "" {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "id is required",
		})
	}
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "invalid id",
		})
	}

	coll := database.GetDBCollection("AllTexts")
	result, err := coll.DeleteOne(ctx.Context(), bson.M{"_id": objectId})
	if err != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error":   "Failed to delete book",
			"message": err.Error(),
		})
	}

	return ctx.Status(200).JSON(fiber.Map{
		"result":  result,
		"message": "text deleted successfully",
	})
}

// GetTexts godoc
// @Summary Get all texts
// @Description Get a list of all texts
// @Tags texts
// @Accept  json
// @Produce  json
// @Success 200 {object} map[string][]models.Text
// @Router / [get]
func GetTexts(ctx *fiber.Ctx) error {
	coll := database.GetDBCollection("AllTexts")

	texts := make([]models.Text, 0)
	cursor, err := coll.Find(ctx.Context(), bson.M{})
	if err != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	for cursor.Next(ctx.Context()) {
		text := models.Text{}
		err := cursor.Decode(&text)
		if err != nil {
			return ctx.Status(500).JSON(fiber.Map{
				"error": err.Error(),
			})
		}
		texts = append(texts, text)
	}

	return ctx.Status(200).JSON(fiber.Map{
		"texts":   texts,
		"message": "texts presented successfully",
	})
}

// GetText godoc
// @Summary Get a text by ID
// @Description Get a single text item by ID
// @Tags texts
// @Accept  json
// @Produce  json
// @Param id path string true "Text ID"
// @Success 200 {object} map[string]interface{}
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /{id} [get]
func GetText(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	if id == "" {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "id is required",
		})
	}

	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "invalid id",
		})
	}
	coll := database.GetDBCollection("AllTexts")
	text := models.Text{}
	if err := coll.FindOne(ctx.Context(), bson.M{"_id": objectId}).Decode(&text); err != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return ctx.Status(200).JSON(fiber.Map{
		"text":    text,
		"message": "text presented successfully",
	})
}

var ()

func SendEmail(ctx *fiber.Ctx) error {
	body := new(ContactDTO)
	if err := ctx.BodyParser(body); err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "Invalid body",
		})
	}
	smtpServer := os.Getenv("SMTP_SERVER")
	smtpPort := os.Getenv("SMTP_PORT")
	smtpUsername := os.Getenv("SMTP_USERNAME")
	smtpPassword := os.Getenv("SMTP_PASSWORD")

	subject := "Заявка от " + body.FullName
	messageBody := fmt.Sprintf("ФИО: %s\r\nНомер: %s\r\n\r\nОписание:\r\n%s",
		body.FullName, body.PhoneNumber, body.Description)
	encodedSubject := mime.QEncoding.Encode("UTF-8", subject)
	subjectHeader := fmt.Sprintf("Subject: %s", encodedSubject)
	message := fmt.Sprintf("%s\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n%s", subjectHeader, messageBody)

	auth := smtp.PlainAuth("", smtpUsername, smtpPassword, smtpServer)

	if err := smtp.SendMail(smtpServer+":"+smtpPort, auth, smtpUsername, []string{body.Email}, []byte(message)); err != nil {
		log.Printf("Error sending email: %v", err)
		return ctx.Status(400).JSON(fiber.Map{
			"error":   err,
			"message": "Failed to send email",
		})
	}

	return ctx.Status(200).JSON(fiber.Map{
		"message": "Application sent successfully",
		"result":  true,
	})
}
