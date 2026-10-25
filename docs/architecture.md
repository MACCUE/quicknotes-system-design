# QuickNotes Architecture Document

## 1. Functional & Non-Functional Requirements
- **Functional Requirements:**
  - Users can register, log in, and securely manage their own notes.
  - Users can create, view, update, delete, and organize notes using tags.
- **Non-Functional Requirements:**
  - **Scalability:** The system must support up to 1,000,000 active users with low latency.
  - **Availability:** High availability (99.9% uptime) achieved via load balancing and database replication.
  - **Security:** Encrypted data transmission (HTTPS/TLS) and secure token-based authentication.

---

## 2. Load Estimates (1 Million Users)
- **Daily Active Users (DAU):** 1,000,000 users.
- **Write Operations (Creates/Updates):** Assuming each user creates 2 notes per day $\rightarrow 2,000,000\text{ writes/day} \approx 23.15\text{ writes/sec}$.
- **Read Operations (Fetches/Searches):** Assuming each user views 20 notes per day $\rightarrow 20,000,000\text{ reads/day} \approx 231.48\text{ reads/sec}$.
- **Storage per Year:** Assuming ~2 KB per note text average $\rightarrow 2,000,000\text{ notes/day} \times 2\text{ KB} = 4,000,000\text{ KB/day} \approx 4\text{ GB/day} \approx 1.46\text{ TB/year}$.

---

## 3. System Architecture Diagram
```text
[ Clients / Web App ]
         |
         v
  [ Load Balancer ]
         |
         +-------------------+
         |                   |
         v                   v
  [ App Server 1 ]    [ App Server 2 ]
         |                   |
         +---------+---------+
                   |
         +---------+---------+-------------------+
         |                   |                   |
         v                   v                   v
   [ Cache (Redis) ]  [ Message Queue ]  [ Primary Database ]
                             |                   |
                             v             (Replication)
                      [ Worker Service ]         |
                                                 v
                                          [ Read Replica DB ]