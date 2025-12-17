# LinkLance – Freelance Marketplace (MERN Stack)

LinkLance is a full-stack freelance marketplace application built using the **MERN stack**.  
The platform connects **clients, freelancers, and administrators** through a secure, role-based system that supports project posting, applications, and real-time communication.

The project demonstrates modern full-stack development practices with a focus on **security, usability, scalability, and clean architecture**.

---

## 👥 User Roles & Capabilities

### 👤 Client
- Post freelance projects
- View and manage applications
- Chat with selected freelancers
- Approve submitted work

### 🧑‍💻 Freelancer
- Browse available projects
- Apply to relevant jobs
- Communicate with clients via chat
- Submit completed work

### 🛡 Admin
- View all registered users
- Manage projects and applications
- Delete users or projects (admin cannot delete themselves)
- Monitor platform activity

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS (Dark Mode supported)
- Axios
- React Router DOM
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Socket.IO for real-time messaging

---

## 📁 Project Structure

root
├── client/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json
│
├── server/ # Node.js + Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── config/
│ └── package.json
│
├── README.md
└── .gitignore


---

## ⚙️ Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=6001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


▶️ How to Start & Run the Project
1️⃣ Start the Backend Server

cd server
npm install
npm run dev

Backend will run at:
http://localhost:6001

2️⃣ Start the Frontend Application

cd client
npm install
npm run dev

Frontend will run at:
http://localhost:5173

🔐 Authentication & Authorization

- Secure JWT-based authentication

- Role-based access control (Client, Freelancer, Admin)

- Protected routes cannot be accessed without login

- Admins are restricted from deleting their own accounts

- API endpoints are secured using middleware

💬 Real-Time Chat System
- Implemented using Socket.IO

- Chat is enabled only after a freelancer is assigned to a project

- Chat remains active until the client approves submitted work

- After project completion, chat becomes read-only

- Messages are aligned and color-coded based on sender

📌 Core Features
- Role-based dashboards
- Project posting and browsing
- Project application and tracking
- Secure authentication and authorization
- Real-time messaging
- Admin user and project management
- Clean, responsive UI with dark mode

🧪 Development & Best Practices
- MongoDB Atlas used for cloud database
- Modular backend architecture
- Reusable React components
- RESTful API design
- Proper error handling and validation
- Clean folder structure for maintainability
