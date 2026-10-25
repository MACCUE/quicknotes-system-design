# QuickNotes System Design

##  Description
QuickNotes is a full-stack web application and enterprise system design project. It transitions a basic browser-only note-taking utility into a scalable online service designed to support 1 million active users. The repository contains both the functional frontend API client (interacting with JSONPlaceholder) and comprehensive backend system design documentation.

---

##  How to Run the API Client
1. Clone or download this repository to your local machine.
2. Open the project folder in **Visual Studio Code**.
3. Open **`index.html`** using a live server extension (like Live Server in VS Code) or open it directly in your web browser.
4. Use the interface to:
   - Click **"Load notes"** to fetch and display 10 notes from the server.
   - Fill out the title and body form and click **"Submit Note"** to create a new note (with validation).
   - Click the **"Delete"** button next to any note to remove it.

---

## System Design Documentation
* [API Design Document](docs/api-design.md) - Details RESTful endpoints, request/response JSON examples, and HTTP error handling.
* [Data Model Document](docs/data-model.md) - Outlines entities (`users`, `notes`, `tags`, `note_tags`), SQL schema tables, queries, indexes, and SQL vs. NoSQL justification.
* [Architecture Document](docs/architecture.md) - Covers load estimates for 1M users, system architecture diagram, component explanations, request flows, and trade-offs.

---

##  What I Learned
1. **API Integration & State Management:** Learned how to build robust frontend clients that handle asynchronous `fetch` requests while safely managing loading, success, error, and empty states.
2. **Relational Database Design:** Gained practical experience designing normalized SQL database schemas, writing complex `JOIN` queries, and establishing many-to-many junction tables with foreign key constraints.
3. **Scalable System Architecture:** Developed a deep understanding of high-availability scaling patterns, including load balancing, database replication lag, caching layers, and asynchronous background worker queues.