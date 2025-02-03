import express from "express";
import { getAICompletion } from "../controllers/chatgptController";

const router = express.Router();

router.post("/ai-suggestion", getAICompletion);

export default router;
