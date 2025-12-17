# LinkLance – Freelance Marketplace (MERN Stack)

LinkLance is a full-stack freelance marketplace built using the **MERN stack**.
It supports three roles:

- 👤 Client – Post projects, review applications, chat, approve work
- 🧑‍💻 Freelancer – Apply to projects, chat, submit work
- 🛡 Admin – Manage users and projects

The application includes **real-time chat**, role-based access, and a clean
Tailwind-based UI with dark mode support.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router
- Context API

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Socket.IO (real-time chat)

---

## 📁 Project Structure

root
├── client/ # React frontend
├── server/ # Node/Express backend
├── README.md
└── .gitignore


---

## ⚙️ Environment Variables

### server/.env

PORT=6001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

---

## ▶️ Running the Project

### 1️⃣ Start Backend

cd server
npm install
npm run dev

Server runs at:
http://localhost:6001

### 2️⃣ Start Frontend

cd client
npm install
npm run dev

# Frontend runs at:
http://localhost:5173

🔐 Authentication & Roles
-JWT based authentication
-Role-based route protection
-Admin cannot delete themselves
-Chat available only after project assignment

💬 Chat System
-Real-time messaging using Socket.IO
-Chat stays open until client approves submitted work
-Read-only chat after project completion
-Messages aligned by sender with color distinction
