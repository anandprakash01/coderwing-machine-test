import jwt from "jsonwebtoken";

import {AppError} from "../../utils/AppError.js";
import {asyncHandler} from "../../utils/asyncHandler.js";

import {User} from "./user.model.js";
import env from "../../config/env.js";

const cookieOptions = {
  httpOnly: true,
  sameSite: env.NODE_ENV === "production" ? "None" : "Lax",
  secure: env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  console.log(email, password);

  if (!email || !password) {
    throw new AppError(400, "Email or password is missing");
  }

  const user = await User.findOne({email}).select("+password");

  if (!user) {
    throw new AppError(401, "Email is not registered");
  }

  const checkPass = await user.matchPassword(password);
  if (!checkPass) {
    throw new AppError(400, "Email or password is incorrect");
  }

  const payload = {id: user._id};
  const token = jwt.sign(payload, env.JWT_SECRET_KEY, {expiresIn: env.JWT_EXPIRE});

  res.cookie("jwt", token, cookieOptions);
  res.status(200).json({
    success: true,
    message: "logged in!",
    data: {
      name: user.name,
      email: user.email,
    },
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body;

  console.log(name, email, password);

  const user = await User.findOne({email});

  if (user) {
    throw new AppError(401, "Email already registered");
  }

  const dbUser = await User.create({name, email, password});

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user: {name: dbUser.name, email: dbUser.email},
    },
  });
});

export {loginUser, registerUser};
