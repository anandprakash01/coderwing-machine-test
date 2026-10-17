import jwt from "jsonwebtoken";
import {AppError} from "../utils/AppError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import env from "../config/env.js";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AppError(401, "You are not logged in. Please log in to get access.");
  }
  const decoded = jwt.verify(token, env.JWT_SECRET_KEY);
  req.user = decoded;

  next();
});
