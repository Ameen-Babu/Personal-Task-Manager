# Personal Task Manager (MERN Stack)

A full-stack Personal Task Manager application built using the MERN stack (MongoDB, Express, React, Node.js). This application enables users to securely register, log in, and manage their daily tasks efficiently.

## 🚀 Features

*   **User Authentication**: Secure registration and login functionality (JWT-based).
*   **Task Management**: Create, Read, and Delete tasks.
*   **Responsive Design**: A clean and user-friendly interface using React.
*   **Secure API**: Backend routes protected with JSON Web Tokens.
*   **Database**: Persistent data storage using MongoDB.

## 🛠️ Tech Stack

*   **Frontend**: React.js, Vite, Axios, React Router.
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB, Mongoose.
*   **Tools**: Postman (for API testing), Git.

## 📂 Project Structure

```
mern-task-manager/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages (Dashboard, Login, Register)
│   │   └── context/        # State management
│   └── vite.config.js      # Vite configuration (Proxy setup)
│
├── server/                 # Node.js Backend
│   ├── config/             # Database connection
│   ├── controllers/        # Request logic
│   ├── models/             # Database schemas (User, Task)
│   ├── routes/             # API routes
│   └── middleware/         # Auth middleware
│
├── README.md               # Project Documentation
└── Procfile                # Heroku Deployment Config
```

## ⚙️ Setup and Installation

### Prerequisites
*   Node.js (v14 or higher)
*   MongoDB installed and running locally

### 1. Clone the Repository
```bash
git clone <repository-url>
cd mern-task-manager
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder with the following configuration:
```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
JWT_SECRET=mysecretkey123
```
*Note: The server runs on port 5001 to avoid common port conflicts.*

### 3. Frontend Setup
Navigate to the client directory and install dependencies:
```bash
cd ../client
npm install
```

## 🏃‍♂️ How to Run

You need to run the **Backend** and **Frontend** in two separate terminals.

**Terminal 1: Backend**
```bash
cd server
npm run dev
```
*Output should show:* `MongoDB Connected: 127.0.0.1` and `Server started on port 5001`

**Terminal 2: Frontend**
```bash
cd client
npm start
```
*Access the application at:* `http://localhost:5173`

## 🔌 API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Authenticate user & get token | Public |
| GET | `/api/tasks` | Get all tasks for logged-in user | Private |
| POST | `/api/tasks` | Create a new task | Private |
| DELETE | `/api/tasks/:id` | Delete a task | Private |

## ❓ Troubleshooting

*   **"Bad Auth" Error**: Check your `.env` file in the `server` folder. Ensure `MONGO_URI` is set to `mongodb://127.0.0.1:27017/taskmanager`.
*   **CORS Errors**: Ensure you are accessing the app via `http://localhost:5173`. The project is configured with a proxy to forward requests to the backend.

## 📝 License
This project is open-source and available for educational purposes.
