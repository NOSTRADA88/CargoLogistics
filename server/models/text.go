package models

type Text struct {
	Id    string `json:"id" bson:"_id"`
	Title string `json:"title" bson:"title"`
	Text  string `json:"text" bson:"text"`
}
