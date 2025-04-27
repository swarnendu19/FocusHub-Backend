import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import config from "./config/appConfig";
import { initializeDatabase } from "./database/db";

dotenv.config();

const app = express();
const BASE_PATH = config.BASE_PATH;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(config.PORT, async () => {
    await initializeDatabase();
    console.log(`Server is running on port ${config.PORT}`);
  });
 