package database

import (
	"context"
	"errors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"os"
)

var db *mongo.Database

func Init() error {
	err := godotenv.Load("server.env", ".env")
	if err != nil {
		return err
	}
	url := os.Getenv("MONGODB_URL")

	if url == "" {
		return errors.New("MONGODB_URL is empty, check environmental variable")
	}

	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(url))
	if err != nil {
		return err
	}

	db = client.Database("CargoLogistics")

	return nil
}

func CloseDB() error {
	return db.Client().Disconnect(context.Background())
}

func GetDBCollection(collection string) *mongo.Collection {
	return db.Collection(collection)
}
