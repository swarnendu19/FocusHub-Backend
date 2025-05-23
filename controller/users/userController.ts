import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../db";
import type { Request, Response } from "express";
import type { RequestHandler } from "express";

const updateUser : RequestHandler= async (req:Request, res:Response)=>{
    if (!req.params.id || !ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Invalid user ID format' });
        return;
      }

      const { xp, tasksCompleted, level, tasks, completedTasks, unlockedBadges } = req.body;

      const numXP = Number(xp) || 0;
      const numTasksCompleted = Number(tasksCompleted) || 0;
      const numLevel = Number(level) || 1;

      const sanitizedTasks = Array.isArray(tasks)
      ? tasks.map((task) => ({
          ...task,
          deadline: task.deadline || null
        }))
      : [];
  
    const sanitizedCompletedTasks = Array.isArray(completedTasks)
      ? completedTasks.map((task) => ({
          ...task,
          deadline: task.deadline || null
        }))
      : [];
  
    if (isNaN(numXP) || isNaN(numTasksCompleted) || isNaN(numLevel)) {
        res
        .status(400)
        .json({ error: 'Invalid xp, tasksCompleted, or level value' });

        return;
    }
  
    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection('users');
  
      const userId = ObjectId.isValid(req.params.id)
        ? new ObjectId(req.params.id)
        : null;
      if (!userId) {
         res.status(400).json({ error: 'Invalid user ID' });
         return;
      }
  
      // Get existing user data
      const existingUser = await usersCollection.findOne({ _id: userId });
      const existingBadges = existingUser?.unlockedBadges || [];
  
      // Only merge badges if they're not being explicitly cleared
      const mergedBadges = req.body.unlockedBadges === undefined
        ? [...new Set([...existingBadges, ...(req.body.unlockedBadges || [])])]
        : req.body.unlockedBadges; 
  
      const result = await usersCollection.updateOne(
        { _id: userId },
        {
          $set: {
            xp: numXP,
            tasksCompleted: numTasksCompleted,
            level: numLevel,
            tasks: sanitizedTasks,
            completedTasks: sanitizedCompletedTasks,
            unlockedBadges: mergedBadges,
            updatedAt: new Date()
          }
        }
      );
  
      if (result.matchedCount === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}
const getUser: RequestHandler = async (req : Request, res: Response)=>{
    try {
        if(!req.params.id || ObjectId.isValid(req.params.id)){
             res.status(400).json({error: "Invalid User Id formart "})
             return;
        }
        const db = await connectToDatabase();
        const userCollection = db.collection('users');
        const user = userCollection.findOne(
            {_id: new ObjectId(req.params.id)},
            {projection:{
                name:  1,
                xp: 1,
                level: 1,
                isOptIn: 1,
                unlockedBadges: 1,
                _id: 1
            } }
        )

        console.log("Here is User->", user);
        

        if (!user) {
              res.status(404).json({ error: 'User not found' });
              return;
         }

         res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const updateOptIn: RequestHandler = async (req: Request, res: Response)=>{
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });

    if (!user) {
       res.status(404).json({ error: 'User not found' });
       return;
    }

    const newStatus = !user.isOptIn;

    await usersCollection.updateOne(
      {_id: new ObjectId(req.params.id)},
      {$set: {isOptIn : newStatus}}
    )

    res.json({
      message: `Opt-in status updated successfully`,
      isOptIn: newStatus
    });
  } catch (error) {
    console.error('Error updating opt-in status:', error);
    res.status(500).json({ error: 'Internal server error' });
    
  }
}

export default {getUser, updateUser, updateOptIn}
