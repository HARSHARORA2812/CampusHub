# 🎓 CampusHub

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## 🌟 Overview

CampusHub is a modern, full-stack campus management system designed to streamline campus life for students, faculty, and administrators. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it provides a centralized platform for managing academic and extracurricular activities within educational institutions.

## 🚀 Key Features

### 👥 User Management
- Secure authentication with JWT
- Role-based access control (Student, Faculty, College Admin)
- Profile management and user settings

### 📅 Academic Tools
- Course management and enrollment
- Assignment submissions and grading
- Academic calendar integration

### 👥 Student Life
- Club and organization management
- Event planning and registration
- Lost & Found system
- Campus marketplace

### 📊 Administration
- Comprehensive admin dashboard
- User management and permissions
- Analytics and reporting
- System configuration

### 🛠️ Technical Stack
- **Frontend**: React, Redux, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, bcrypt
- **Real-time**: Socket.io

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the frontend directory with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
CampusHub/
├── backend/           # Backend server code
├── frontend/          # Frontend React application
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
