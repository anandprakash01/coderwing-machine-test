import express from "express";

import {getAllProducts} from "./product.controller.js";

const router = express.Router();

router.get("/all", getAllProducts);

export default router;
