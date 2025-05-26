import type { ObjectId } from "mongodb";

export interface SharedProjectEntry {
    projectId: string;
    ownerId: string;
    joinedAt: Date;
  }
  
  export interface Task {
    _id: ObjectId;
    title: string;
    description?: string;
    isShared?: boolean;
    sharedWith?: string[];
    [key: string]: any;
  }
  
  export interface UserDocument {
    _id: ObjectId;
    tasks: Task[];
    sharedProjects?: SharedProjectEntry[];
  }