# hospitalmanagement_backend

🚀 Auth API Documentation

This document describes the authentication endpoints for the backend service.

Base URL:

http://localhost:5000/api/v1
🔐 Authentication
📌 Login API
Endpoint
POST /auth/login

Full URL:

http://localhost:5000/api/v1/auth/login
📥 Request Body

Send JSON in the following format:

{
  "email": "test@example.com",
  "password": "Test@1234"
}
📤 Success Response

Status Code: 200 OK

{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "6a2e7bf3d9272c65e967f169",
      "name": "Test User",
      "email": "test@example.com",
      "role": "admin",
      "isEmailVerified": false,
      "createdAt": "2026-06-14T10:01:23.792Z",
      "updatedAt": "2026-06-14T10:31:36.584Z",
      "__v": 0,
      "lastLoginAt": "2026-06-14T10:31:36.583Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
  }
}


👤 User Authentication API
📌 Register API
Endpoint
POST /auth/register

Full URL:

http://localhost:5000/api/v1/auth/register
📥 Request Body

Send JSON in the following format:

{
  "name": "Jagadish Mohanty",
  "email": "jagadish@example.com",
  "password": "Test@1234"
}
📤 Success Response

Status Code: 201 Created

{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "name": "Jagadish Mohanty",
    "email": "jagadish@example.com",
    "role": "user",
    "isEmailVerified": false,
    "_id": "6a2e7f010ea6c739b2bc809e",
    "createdAt": "2026-06-14T10:14:25.625Z",
    "updatedAt": "2026-06-14T10:14:25.625Z",
    "__v": 0
  }
}

{
	"success": true,
	"statusCode": 200,
	"message": "Profile fetched",
	"data": {
		"_id": "6a2e7bf3d9272c65e967f169",
		"name": "Test User",
		"email": "test@example.com",
		"role": "user",
		"isEmailVerified": false,
		"createdAt": "2026-06-14T10:01:23.792Z",
		"updatedAt": "2026-06-14T10:17:43.107Z",
		"__v": 0,
		"lastLoginAt": "2026-06-14T10:17:43.103Z"
	}
}


👤 User Profile API
📌 Get User Profile

This endpoint returns the authenticated user’s profile details.

🔗 Endpoint
GET /users/profile

Full URL:

http://localhost:5000/api/v1/users/profile
🔐 Headers (Required)

You must include a valid JWT access token.

Authorization: Bearer <access_token>
📥 Request Body

No request body required.

📤 Success Response

Status Code: 200 OK

{
  "success": true,
  "statusCode": 200,
  "message": "User profile fetched successfully",
  "data": {
    "_id": "6a2e7f010ea6c739b2bc809e",
    "name": "Jagadish Mohanty",
    "email": "jagadish@example.com",
    "role": "user",
    "isEmailVerified": false,
    "createdAt": "2026-06-14T10:14:25.625Z",
    "updatedAt": "2026-06-14T10:14:25.625Z"
  }
}

