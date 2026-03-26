import { Router } from "express";
const router = Router();
import rateLimit from "express-rate-limit";
import { register, login, logout } from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { msg: "IP rate limit exceeded, retry in 15 minutes." },
});

router.post("/register", authRateLimiter, validateRegisterInput, register);
router.post("/login", authRateLimiter, validateLoginInput, login);
router.get("/logout", logout);

export default router;
