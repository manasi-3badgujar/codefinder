# LinkLance – Backend

Backend API for LinkLance freelancing platform.

## Tech Stack
- Node.js
- Express
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- Socket.IO

## Features
- Authentication (Client / Freelancer / Admin)
- Project CRUD
- Applications & approvals
- Role-based access control
- Real-time chat via Socket.IO

## Setup Instructions

### 1. Install dependencies

cd server
npm install

### 2. Environment variables
Create .env file:

PORT=6001
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key

### 3. Run server

npm run dev

Server runs at:
http://localhost:6001


### Notes
- Admins are created directly in DB
- Passwords stored as bcrypt hashes