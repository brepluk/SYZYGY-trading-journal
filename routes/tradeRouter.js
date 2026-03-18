import { Router } from "express";
const router = Router();

import {
  getAllTrades,
  createTrade,
  getSingleTrade,
  updateTrade,
  deleteTrade,
} from "../controllers/tradeController.js";

router.route("/").get(getAllTrades).post(createTrade);
router.route("/:id").get(getSingleTrade).patch(updateTrade).delete(deleteTrade);

export default router;
