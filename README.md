# 🚀 DSA Prep Platform

A full-stack MERN application to track DSA progress, manage solved problems, and generate AI-powered hints and study plans using Gemini AI.

## 🌐 Live Demo

Frontend: https://dsa-prep-platform.vercel.app

Backend: https://dsa-prep-platform.onrender.com

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Authentication

### 📚 Question Management

* Add Questions
* Edit Questions
* Delete Questions
* Search Questions
* Filter by Topic
* Filter by Difficulty

### 📊 Progress Tracking

* Topic-wise Progress
* Day Streak
* Achievement Badges
* Dashboard Statistics

### 🌙 User Experience

* Dark Mode
* Responsive Design

### 🤖 AI Features

#### AI Hint Generator

Generate hints for DSA problems using Gemini AI.

#### AI Study Plan Generator

Create personalized study roadmaps based on:

* Current Level
* Goal (Placements, FAANG, etc.)
* Available Time

## 🛠 Tech Stack

### Frontend

* React.js
* React Router
* Axios

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* MongoDB Atlas
* Mongoose

### AI

* Google Gemini API

### Deployment

* Vercel
* Render

## 📷 Screenshots

### Login Page

<img src="./login-page.png" width="800"/>

### Dashboard Light Mode

<img src="./dashboard-light.png" width="800"/>

### Dashboard Dark Mode

<img src="./dashboard-dark.png" width="800"/>

## 📂 Project Structure

```
dsa-prep-platform
│
├── frontend
├── backend
├── README.md
```

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/Shrey2006865/dsa-prep-platform.git
cd dsa-prep-platform
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## 🔑 Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

## 🎯 Future Improvements

* Revision Scheduler
* Analytics Dashboard
* AI Mock Interview
* Leaderboard
* PDF Report Generation
* Contest Tracker

## 👨‍💻 Author

Shreyash Tajne

---

⭐ If you like this project, consider giving it a star.
