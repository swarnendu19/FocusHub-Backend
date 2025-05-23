import express from "express";
import { authenticateToken } from "../../middleware/auth";
import getLeaderboard from "../../controller/leaderboard/leaderboardController";

const router = express.Router();

router.get("/", authenticateToken, getLeaderboard)

export default router;
