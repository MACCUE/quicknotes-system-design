# QuickNotes Data Model Document

## 1. Entities & Attributes
QuickNotes utilizes a relational database structure consisting of four primary entities:
- **`users`**: Stores user account credentials and profile information.
  - Columns: `id` (INT, PK), `username` (VARCHAR), `email` (VARCHAR), `created_at` (TIMESTAMP).
- **`notes`**: Stores individual note content created by users.
  - Columns: `id` (INT, PK), `user_id` (INT, FK), `title` (VARCHAR), `body` (TEXT), `created_at` (TIMESTAMP), `updated_at` (TIMESTAMP).
- **`tags`**: Stores category tags for organizing notes.
  - Columns: `id` (INT, PK), `name` (VARCHAR).
- **`note_tags`**: A junction table resolving the many-to-many relationship between notes and tags.
  - Columns: `note_id` (INT, FK), `tag_id` (INT, FK).

---

## 2. Relationships Explanation
- **`users` to `notes` (One-to-Many):** One user can create multiple notes, but each note belongs to exactly one user (linked via `user_id` foreign key).
- **`notes` to `tags` (Many-to-Many):** A single note can have multiple tags, and a single tag can be applied to many different notes. This relationship is managed by the `note_tags` junction table.

---

## 3. SQL CREATE TABLE Statements

```sql
-- 1. Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Notes Table
CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    body TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Tags Table
CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- 4. Note Tags Junction Table (Many-to-Many)
CREATE TABLE note_tags (
    note_id INT,
    tag_id INT,
    PRIMARY KEY (note_id, tag_id),
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);