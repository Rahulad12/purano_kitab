# Purano Kitab - API Design Documentation

## Base URL
```
Development: http://localhost:3000/api/v1
Production: https://api.puranokitab.com/api/v1
```

## Authentication
- **Type**: JWT Bearer Token
- **Header**: `Authorization: Bearer <token>`
- **Token Storage**: SecureStore (encrypted)

---

## Authentication Endpoints

### POST /auth/login
Login with email and password
```json
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### POST /auth/register
Register a new user
```json
Request:
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "+91XXXXXXXXXX"
}

Response: 201 Created
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

### POST /auth/google
Google OAuth callback (backend exchanges code for token)
```json
Request:
{
  "code": "google_auth_code",
  "redirectUri": "https://app.puranokitab.com/auth/success"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

### POST /auth/logout
Logout (invalidate token)
```
Request: Authorization header required
Response: 200 OK
{ "message": "Logged out successfully" }
```

---

## User Endpoints

### GET /users/me
Get current user details
```json
Response: 200 OK
{
  "id": "user123",
  "email": "user@example.com",
  "name": "John Doe",
  "phone": "+91XXXXXXXXXX",
  "avatar": "https://...",
  "bio": "Book lover",
  "rating": 4.5,
  "totalReviews": 12,
  "joinedAt": "2024-01-15",
  "booksListed": 5,
  "booksSold": 3
}
```

### GET /users/:id
Get user profile by ID
```json
Response: 200 OK
{ ...user details... }
```

### PUT /users/me
Update current user profile
```json
Request:
{
  "name": "John Updated",
  "phone": "+91XXXXXXXXXX",
  "bio": "Avid reader"
}

Response: 200 OK
{ ...updated user... }
```

### POST /users/change-password
Change password
```json
Request:
{
  "currentPassword": "old123",
  "newPassword": "new123"
}

Response: 200 OK
{ "message": "Password changed successfully" }
```

### POST /users/change-email-or-phone
Change email or phone
```json
Request:
{
  "email": "newemail@example.com",
  "phone": "+91XXXXXXXXXX",
  "type": "email" or "phone"
}

Response: 200 OK
{ "message": "Email/Phone updated successfully" }
```

---

## Book Endpoints

### GET /books
List all books with pagination and filters
```json
Query Parameters:
- page: number (default: 1)
- limit: number (default: 20)
- search: string
- category: string
- sortBy: "newest", "popular", "price_asc", "price_desc"
- priceMin: number
- priceMax: number
- condition: "new", "like_new", "good", "fair", "poor"

Response: 200 OK
{
  "data": [
    {
      "id": "book123",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "isbn": "978-0743273565",
      "price": 250,
      "condition": "good",
      "category": "fiction",
      "seller": { "id": "user123", "name": "John", "rating": 4.5 },
      "images": ["https://..."],
      "description": "...",
      "edition": "1st",
      "publicationYear": 1925,
      "pages": 180,
      "createdAt": "2024-01-15"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

### GET /books/:id
Get book details
```json
Response: 200 OK
{
  "id": "book123",
  "title": "The Great Gatsby",
  ...full book details...,
  "reviews": [
    {
      "id": "review123",
      "buyer": { "id": "user456", "name": "Jane" },
      "rating": 5,
      "comment": "Great condition!",
      "createdAt": "2024-01-20"
    }
  ]
}
```

### POST /books
Create a new book listing
```json
Request:
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0743273565",
  "price": 250,
  "condition": "good",
  "category": "fiction",
  "description": "Excellent condition, lightly read",
  "edition": "1st",
  "publicationYear": 1925,
  "pages": 180,
  "images": ["base64_image_1", "base64_image_2"]
}

Response: 201 Created
{ ...created book with id... }
```

### PUT /books/:id
Update book listing
```json
Request: (same fields as POST)
Response: 200 OK
{ ...updated book... }
```

### DELETE /books/:id
Delete book listing
```
Response: 200 OK
{ "message": "Book deleted successfully" }
```

---

## Favorite/Wishlist Endpoints

### GET /favorites
Get user's favorite books
```json
Response: 200 OK
{
  "data": [ ...books... ],
  "total": 10
}
```

### POST /favorites/:bookId
Add book to favorites
```json
Response: 201 Created
{ "message": "Added to favorites" }
```

### DELETE /favorites/:bookId
Remove book from favorites
```
Response: 200 OK
{ "message": "Removed from favorites" }
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error",
  "details": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You don't have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Server error",
  "message": "An unexpected error occurred"
}
```

---

## HTTP Status Codes
- `200 OK`: Successful GET, PUT, DELETE
- `201 Created`: Successful POST
- `204 No Content`: Successful DELETE with no response body
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Authenticated but not authorized
- `404 Not Found`: Resource doesn't exist
- `409 Conflict`: Duplicate resource
- `429 Too Many Requests`: Rate limited
- `500 Internal Server Error`: Server error

---

## Rate Limiting
- **Limit**: 100 requests per minute per IP
- **Header**: `X-RateLimit-Remaining`

---

## Pagination
Default: 20 items per page, max 100 items per page

---

## Data Models

### User
```
{
  id: ObjectId
  email: String (unique)
  password: String (hashed)
  name: String
  phone: String
  avatar: String (URL)
  bio: String
  rating: Number (0-5)
  totalReviews: Number
  joinedAt: Date
  updatedAt: Date
}
```

### Book
```
{
  id: ObjectId
  title: String
  author: String
  isbn: String
  price: Number
  condition: Enum ["new", "like_new", "good", "fair", "poor"]
  category: String
  seller: ObjectId (reference to User)
  description: String
  edition: String
  publicationYear: Number
  pages: Number
  images: [String] (URLs)
  createdAt: Date
  updatedAt: Date
  isActive: Boolean
}
```

### Review
```
{
  id: ObjectId
  book: ObjectId
  buyer: ObjectId
  seller: ObjectId
  rating: Number (1-5)
  comment: String
  createdAt: Date
}
```
