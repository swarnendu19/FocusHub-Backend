import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors';

dotenv.config();


const app = express();

app.use(express.json());

app.use(
    cors({
      origin: process.env.CLIENT || 'http://localhost:3000',
      credentials: true, // Allow credentials
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
      exposedHeaders: ['Content-Type', 'Authorization'] // Exposed headers
    })
  );

