import { connectToDatabase } from "../../db";
import { asyncHandler } from "../../utils/asyncHandler";

const getLeaderboard = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = parseInt(req.query.offset as string) || 0;

  const db = await connectToDatabase();
  const userCollection = db.collection("users");

  const leaderBoard = await userCollection
    .find(
      { isOptIn: true },
      {
        projection: {
          name: 1,
          picture: 1,
          xp: 1,
          level: 1,
          taskCompleted: 1,
          _id: 1,
        },
      }
    )
    .sort({ xp: -1 })
    .skip(offset)
    .limit(limit)
    .toArray();

   res.status(200).json({
    success: true,
    leaderBoard,
  });
});

export default getLeaderboard;
