import { connectToDatabase } from "../../db";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { ObjectId } from "mongodb";
import type { Request, Response } from "express";
import type { UserDocument, SharedProjectEntry, Task } from "../../types/collaboration";
import type { User } from "../../types/User";

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
  const userId = req?.user?._id.toString();

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

  const sharedWith = project?.sharedWith || [taskOwner._id.toString()];

  if (!sharedWith.includes(userId)) {
    throw new ApiError(403, "You do not have access to this project");
  }

  await usersCollection.updateOne(
    {'tasks.id': taskId},
    {
      $set: {
        "tasks.$.sharedWith": sharedWith,
      }
    }
  );

  console.log('[GET] Updated project sharing state:', {
    id: project?.id,
    owner: taskOwner._id.toString(),
    sharedWith: sharedWith
  });

  res.json({
    ...project,
    ownerId: taskOwner._id.toString(),
    isShared: true,
    sharedWith: sharedWith
  });
});


const updateSharedProject = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;
   
  const {subtaskIndex, completed} = req.body;

  console.log(`[UPDATE] Updating task ${taskId}, subtask ${subtaskIndex} to ${completed}`);

  if (!taskId) {
    throw new ApiError(400, "Task ID is Invalid");
  } 

  const db = await connectToDatabase();
  const usersCollection = db.collection<UserDocument>("users");

  const usersWithTask = await usersCollection.find({
    $or: [
      { 'tasks.id': taskId },
      { 'sharedProjects.projectId': taskId }
    ]
  }).toArray();
  
  console.log(`[UPDATE] Found ${usersWithTask.length} users with this task`);
  
  for (const user of usersWithTask) {
    console.log(`[UPDATE] Updating task for user ${user?.name} (${user._id})`);
    
    // Find the task in user's tasks array
    const taskIndex = user.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
      console.log(`[UPDATE] Task not found in user's tasks array`);
      continue;
    }

    // Update the specific user's task
    const updateResult = await usersCollection.updateOne(
      { _id: user._id, 'tasks.id': taskId },
      {
        $set: {
          [`tasks.$.subtasks.${subtaskIndex}.completed`]: completed
        }
      }
    );

    console.log(`[UPDATE] Update result for user ${user.name}:`, {
      matched: updateResult.matchedCount,
      modified: updateResult.modifiedCount
    });
  }

  if (usersWithTask.length === 0) {
    throw new ApiError(404, "No users found with this task");
  }

  res.json({ 
    message: 'Project updated successfully',
    updatedUsers: usersWithTask.length
  });
}
)
  

export default {shareProject, getSharedProjects};
