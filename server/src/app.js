import express from "express";
import cors from "cors";
import helmet from "helmet";
import {rateLimit} from "express-rate-limit";
import cookieParser from "cookie-parser";

import {globalErrorHandler} from "./middleware/errorHandler.js";
import {AppError} from "./utils/AppError.js";

import userRouter from "./modules/user/user.routes.js";
import cartRouter from "./modules/cart/cart.routes.js";
import productRouter from "./modules/product/product.routes.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(helmet());

const limiter = rateLimit({
  limit: 100,
  windowMs: 15 * 60 * 1000, //15 min
  message: "too many requests",
  legacyHeaders: false,
  standardHeaders: true,
});

app.use("/api", limiter);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);

app.use(globalErrorHandler);

export default app;
