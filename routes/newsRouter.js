import { Router } from "express";
import { getNewsFeed } from "../controllers/newsController.js";

const router = Router();

router.get("/feed", getNewsFeed);

export default router;
