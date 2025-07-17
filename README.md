<h1 align="center">🌐 Flowbit Multi-Tenant Full Stack App</h1>

<p align="center">
  <b>Technical Challenge Submission for Flowbit Internship</b><br/>
  Implements multi-tenant auth, dynamic micro-frontends, n8n workflows, and secure tenant isolation.
</p>

---

## 🚀 Features

- Multi-Tenant JWT Auth (Admin/User roles)
- Tenant-aware RBAC + data isolation
- React shell with dynamic sidebar from remote registry
- Lazy-loaded microfrontend: `SupportTicketsApp`
- Workflow roundtrip with n8n + callback
- Live UI updates via polling
- Fully containerized using Docker Compose

---

## 🛠️ Stack

- **Frontend:** React + Module Federation
- **Backend:** Node.js + Express + MongoDB
- **Auth:** JWT (bcrypt + jsonwebtoken)
- **Workflow Engine:** n8n (via Docker)
- **Testing:** Jest
- **Containerization:** Docker + Docker Compose

---

## 📦 How to Run (Quick Start)

```bash
git clone https://github.com/your-username/flowbit-assignment.git
cd flowbit-assignment
```
🐳 Start all services:
```
docker-compose up --build
```
This will spin up:
MongoDB
Backend API
React Shell App
SupportTicketsApp (Remote)
n8n (workflow engine)
Local tunnel (for webhook testing)

## 🧪 Seed Script
```
npm run seed
```
# Adds:
Tenants: LogisticsCo, RetailGmbH
# Admins:
admin1@logistics.com / 123456
admin2@retail.com / 123456

## 🧪 Test (Tenant Isolation)
Run the Jest test:

```
npm test
```
# This ensures:
Admin A cannot access tickets from Admin B’s tenant.
Role-based access to /admin/* is enforced.

## 🔁 Workflow Flow
User (Admin) submits a ticket
Backend triggers n8n webhook
n8n runs automation, then calls /webhook/ticket-done
Backend verifies secret, updates ticket status
UI polls every 5s → updated live

### 🗂️ Directory Structure
````
.
├── backend/
│   ├── models/
│   ├── routes/
│   └── middleware/
├── frontend/
│   ├── shell/              # React container
│   └── support-tickets/    # Microfrontend
├── n8n/
│   └── docker-compose.yml
├── seed/
│   └── seed.js
├── docker-compose.yml
└── README.md
````
### 🖼️ Architecture Diagram
Include this as a PNG/JPG or hand-drawn diagram

![Architecture](./architecture.png)

# It shows:
React Shell
SupportTicketsApp (Remote via Module Federation)
Backend API
MongoDB
n8n (Workflow)
Webhook callback
Polling/WebSocket to UI

# 🎥 Demo Video
Include a 2–3 min demo showing:
Login as both tenants
Create a ticket
Trigger n8n flow
Ticket status updated live
Show RBAC + tenant isolation

## 🛑 Known Limitations
Currently using polling (can upgrade to WebSocket)
Hardcoded use-cases in registry.json
Basic error handling (expandable in production)

### 💼 Author
<table> <tr> <td align="center"> <img src="https://avatars.githubusercontent.com/u/164065390?v=4" width="80px;" alt="Danish Rizwan"/> <br /><sub><b>Danish Rizwan</b></sub><br /> <sub>Frontend Developer</sub> </td> </tr> </table>

📬 Contact
<br>
📧 Email: rdanishrizwan@example.com
<br>

---
