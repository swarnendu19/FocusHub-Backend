import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors';
dotenv.config();

import { connectToDatabase } from './db';
import MongoStore from 'connect-mongo';
import passport from './config/passport-setup';

const app = express();

app.use(express.json());
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
if(!mongoUri){
    console.error("Mongo URI is not defined");
    process.exit(1);
}

app.use(
    session({
      secret: process.env.SESSION_SECRET || 'fallback_secret',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: mongoUri,
        collectionName: 'sessions',
        autoRemove: 'native',
        touchAfter: 24 * 3600
      }),
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
      }
    })
  );

  // Passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
      origin: process.env.CLIENT || 'http://localhost:3000',
      credentials: true, // Allow credentials
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
      exposedHeaders: ['Content-Type', 'Authorization'] // Exposed headers
    })
  );


// Routes of this application

import authorute from "./routes/auth/auth.route"

app.use('/api/auth', authorute);


const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try{
        await connectToDatabase();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Error starting server: ", error);
        process.exit(1);
    }
}

startServer();

