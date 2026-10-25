# QuickNotes API Design Document

## 1. Overview
This document specifies the RESTful API endpoints for the QuickNotes backend service. The API enables users to manage accounts, create, read, update, delete, and tag notes securely.

---

## 2. API Endpoints Table

| Method | Endpoint | Description | Success Status |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/notes` | Retrieve a paginated list of notes for the authenticated user. | `200 OK` |
| **POST** | `/api/v1/notes` | Create a new note. | `201 Created` |
| **GET** | `/api/v1/notes/{id}` | Retrieve a single note by its unique ID. | `200 OK` |
| **PUT** | `/api/v1/notes/{id}` | Update an existing note completely. | `200 OK` |
| **DELETE** | `/api/v1/notes/{id}` | Delete a note by its unique ID. | `204 No Content` |
| **GET** | `/api/v1/tags` | Retrieve all available tags for organizing notes. | `200 OK` |

---

## 3. Request & Response Examples

### A. List Notes (`GET /api/v1/notes`)
* **Request Headers:** `Authorization: Bearer <token>`
* **Response Body (`200 OK`):**
```json
{
  "status": "success",
  "data": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "notes": [
      {
        "id": 101,
        "title": "System Architecture Review",
        "body": "Discuss caching layers and database replication lag with the team.",
        "user_id": 1,
        "created_at": "2026-10-22T10:00:00Z"
      }
    ]
  }
}