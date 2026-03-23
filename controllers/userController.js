import { prisma } from "../prisma/client.js";
import { StatusCodes } from "http-status-codes";

export const getCurrentUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.userId,
    },
    omit: { password: true },
  });
  res.status(StatusCodes.OK).json({ user });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  const updatedUser = await prisma.user.update({
    where: { id: req.user.userId },
    data: newUser,
  });
  res.status(StatusCodes.OK).json({ message: "User updated successfully" });
};
