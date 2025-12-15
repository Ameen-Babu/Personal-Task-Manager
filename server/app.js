const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');



const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

const startServer = async () => {
    const port = process.env.PORT || 5000;
    try {
        await connectDB();
        app.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (error) {
        console.log("Failed to connect to DB, server not started", error);
    }
}

startServer();
