import {
  UnauthenticatedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("Authentication invalid");

  try {
    const { userId } = verifyJWT(token);
    const testUser = userId === "cmn6deybt0000ze8osrmocrx4";
    req.user = { userId, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo user. Read only.");
  }
  next();
};
