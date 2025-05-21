import type { Document, ObjectId } from "mongodb";

export interface User extends Document {
    _id?: ObjectId;
    googleId: string;
    email: string;
    name: string;
    picture: string;
    xp: number;
    level: number;
    taskCompleted: number;
    tasks: any[]; // type your task schema if available
    completedTasks: any[];
    unlockdBatches: any[]; // fix typo if it should be `unlockedBadges`
    isOptIn: boolean;
    createdAt: Date;
    lastLogin: Date;
  }
  