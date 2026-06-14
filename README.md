# 🚀 Hospital Management Backend API

A Node.js + Express + MongoDB backend system with authentication and user management.

---

## 📌 Base URL


http://localhost:5000/api/v1


---

# 🔐 Authentication APIs

## 📝 Register User

### Endpoint


POST /auth/register


### Full URL


http://localhost:5000/api/v1/auth/register


### Request Body

```json
{
  "name": "Jagadish Mohanty",
  "email": "jagadish@example.com",
  "password": "Test@1234"
}
Success Response (201)
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "_id": "6a2e7f010ea6c739b2bc809e",
    "name": "Jagadish Mohanty",
    "email": "jagadish@example.com",
    "role": "user",
    "isEmailVerified": false,
    "createdAt": "2026-06-14T10:14:25.625Z",
    "updatedAt": "2026-06-14T10:14:25.625Z",
    "__v": 0
  }
}
🔑 Login User
Endpoint
POST /auth/login
Full URL
http://localhost:5000/api/v1/auth/login
Request Body
{
  "email": "test@example.com",
  "password": "Test@1234"
}
Success Response (200)
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
      "lastLoginAt": "2026-06-14T10:31:36.583Z"
    },
    "accessToken": "YOUR_ACCESS_TOKEN",
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }
}
👤 User APIs
📄 Get User Profile
Endpoint
GET /users/profile
Full URL
http://localhost:5000/api/v1/users/profile
Headers
Authorization: Bearer <access_token>
Success Response (200)
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
⚠️ Common Error Responses
Unauthorized
{
  "success": false,
  "message": "Access token missing or invalid"
}
Token Expired
{
  "success": false,
  "message": "Token expired or invalid"
}
🔐 Auth Flow
Register → /auth/register
Login → /auth/login
Get Access Token
Use in headers:
Authorization: Bearer <token>
🛠 Tech Stack
Node.js
Express.js
MongoDB
JWT Authentication
Winston Logger
Docker
