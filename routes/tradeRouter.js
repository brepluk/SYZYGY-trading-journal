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
  getDashboardStats,
  getDashboardCalendar,
} from "../controllers/dashboardController.js";
import {
  validateCreateTradeInput,
  validateIdParam,
  validateUpdateTradeInput,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router
  .route("/")
  .get(getAllTrades)
  .post(checkForTestUser, validateCreateTradeInput, createTrade);
router.post(
  "/upload-image",
  checkForTestUser,
  upload.single("image"),
  uploadTradeImage,
);
router.get("/dashboard-stats", getDashboardStats);
router.get("/dashboard-calendar", getDashboardCalendar);
router
  .route("/:id")
  .get(...validateIdParam, getSingleTrade)
  .patch(
    checkForTestUser,
    ...validateIdParam,
    validateUpdateTradeInput,
    updateTrade,
  )
  .delete(checkForTestUser, ...validateIdParam, deleteTrade);

export default router;
