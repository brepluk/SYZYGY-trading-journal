import { Router } from "express";
const router = Router();

import {
  getAllTrades,
  createTrade,
  getSingleTrade,
  updateTrade,
  deleteTrade,
} from "../controllers/tradeController.js";
import {
  validateCreateTradeInput,
  validateIdParam,
  validateUpdateTradeInput,
} from "../middleware/validationMiddleware.js";

router.route("/").get(getAllTrades).post(validateCreateTradeInput, createTrade);
router
  .route("/:id")
  .get(...validateIdParam, getSingleTrade)
  .patch(...validateIdParam, validateUpdateTradeInput, updateTrade)
  .delete(...validateIdParam, deleteTrade);

export default router;
