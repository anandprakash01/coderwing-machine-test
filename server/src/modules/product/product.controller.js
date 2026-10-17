import {AppError} from "../../utils/AppError.js";
import {asyncHandler} from "../../utils/asyncHandler.js";
import {Product} from "./product.model.js";

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (!products) {
    throw new AppError(400, "No products available");
  }
  res.status(200).json({
    success: true,
    message: "products available",
    data: {
      products,
    },
  });
});

export {getAllProducts};
