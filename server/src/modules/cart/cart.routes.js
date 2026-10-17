import express from "express";
import {protect} from "../../middleware/auth.js";

import {addToCart, getCartProducts} from "./cart.controller.js";

const router = express.Router();

router.use(protect);
router.get("/", getCartProducts);
router.post("/", addToCart);

export default router;
