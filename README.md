# Social Media Application

A full-stack social media platform built with React, Node.js, Express, and MongoDB.

## Features

- 🔐 User Authentication (Signup/Login)
- 📝 Create Posts with Text and Images
- ❤️ Like Posts
- 💬 Comment on Posts
- 👤 User Profiles
- 📱 Modern, Responsive UI

## Tech Stack

### Frontend
- React
- React Router
- Axios
- Vite

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB

### Backend Setup
```bash
cd backend
npm install
# Create .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend (.env)
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Deployment

- Frontend: Deploy to Vercel, Netlify, or similar
- Backend: Deploy to Render, Railway, or Heroku
- Database: MongoDB Atlas

## License

MIT
