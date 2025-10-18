# CampusHub

A comprehensive campus management system for educational institutions.

## Features

- User authentication and authorization
- Role-based access control (Student, Faculty, College Admin)
- Opportunity management for students
- Admin dashboard for management

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
