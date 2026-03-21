import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma/client.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  await prisma.user.create({ data: req.body });
  res
    .status(StatusCodes.CREATED)
    .json({ message: "User created successfully" });
};

export const login = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError("Invalid credentials");

  const token = createJWT({ userId: user.id });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "Login successful" });
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ message: "Logout successful" });
};
