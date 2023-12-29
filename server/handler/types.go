package handler

type CreateDTO struct {
	Title string `json:"title" bson:"title"`
	Text  string `json:"text" bson:"text"`
}

type UpdateDTO struct {
	Title string `json:"title,omitempty" bson:"title,omitempty"`
	Text  string `json:"text,omitempty" bson:"text,omitempty"`
}

type ContactDTO struct {
	FullName    string `json:"fullName"`
	PhoneNumber string `json:"phoneNumber"`
	Email       string `json:"email"`
	Description string `json:"description"`
}
