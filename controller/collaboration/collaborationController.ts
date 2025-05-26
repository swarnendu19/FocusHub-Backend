import { connectToDatabase } from "../../db";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { ObjectId } from "mongodb";
import type { Request, Response } from "express";
import type { UserDocument, SharedProjectEntry, Task } from "../../types/collaboration";

const shareProject = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { userId } = req.body;

  if (!taskId || !userId) {
    throw new ApiError(400, "Task ID and User ID are Invalid");
  }

  const db = await connectToDatabase();
  const usersCollection = db.collection<UserDocument>("users");

  const taskOwner = await usersCollection.findOne({
    "tasks._id": new ObjectId(taskId),
  });

  if (!taskOwner) {
    throw new ApiError(404, "Task Owner not found");
  }

  const project = taskOwner.tasks.find(
    (task) => task._id.toString() === taskId
  );

  if (!project) {
    throw new ApiError(404, "Project not found in owner's task list");
  }

  let sharedWith = project.sharedWith || [taskOwner._id.toString()];

  if (!sharedWith.includes(userId)) {
    sharedWith.push(userId);
  }

  const sharedProject: Task = {
    ...project,
    isShared: true,
    sharedWith: sharedWith,
  };

  const sharedProjectEntry: SharedProjectEntry = {
    projectId: taskId,
    ownerId: taskOwner._id.toString(),
    joinedAt: new Date(),
  };

  // Update owner's project first
  await usersCollection.updateOne(
    { _id: taskOwner._id, 'tasks.id': taskId },
    {
      $set: {
        'tasks.$': sharedProject
      }
    });

  await usersCollection.updateOne(
    { _id: taskOwner._id },
    {
      $push: {
        tasks: sharedProject,
      },
    }
  );

  await usersCollection.updateOne(
    { _id: taskOwner._id },
    {
      $push: {
        sharedProjects: sharedProjectEntry,
      },
    }
  );

  res.json({
    message: "Project shared successfully",
    currentCollaborators: sharedWith,
  });
});


const getSharedProjects = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const userId = req.user._id.toString();

  console.log(`[GET] Fetching shared project ${taskId} for user ${userId}`);

  if (!taskId || !userId) {
    throw new ApiError(400, "Task ID and User ID are Invalid");
  }

  const db = await connectToDatabase();
  const usersCollection = db.collection<UserDocument>("users");

  const taskOwner = await usersCollection.findOne({
    "tasks._id": taskId,
  });

  if (!taskOwner) {
    throw new ApiError(404, "Task Owner not found");
  }

  const project = taskOwner.tasks.find(
    (task) => task._id.toString() === taskId
  );

  if (!project) {
    throw new ApiError(404, "Project not found in owner's task list");
  }

  const sharedWith = project.sharedWith || [taskOwner._id.toString()];

  if (!sharedWith.includes(userId)) {
    throw new ApiError(403, "You do not have access to this project");
  }
   

})

export default shareProject;
