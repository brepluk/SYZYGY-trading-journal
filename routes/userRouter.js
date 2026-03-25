import { Router } from "express";
const router = Router();

import { getCurrentUser, updateUser } from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

router.get("/current-user", getCurrentUser);
router.patch(
  "/update-user",
  checkForTestUser,
  validateUpdateUserInput,
  updateUser,
);

export default router;
