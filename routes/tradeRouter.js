import { Router } from "express";
import multer from "multer";
const router = Router();

import {
  getAllTrades,
  createTrade,
  getSingleTrade,
  updateTrade,
  deleteTrade,
  uploadTradeImage,
} from "../controllers/tradeController.js";
import {
  validateCreateTradeInput,
  validateIdParam,
  validateUpdateTradeInput,
} from "../middleware/validationMiddleware.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.route("/").get(getAllTrades).post(validateCreateTradeInput, createTrade);
router.post("/upload-image", upload.single("image"), uploadTradeImage);
router
  .route("/:id")
  .get(...validateIdParam, getSingleTrade)
  .patch(...validateIdParam, validateUpdateTradeInput, updateTrade)
  .delete(...validateIdParam, deleteTrade);

export default router;
