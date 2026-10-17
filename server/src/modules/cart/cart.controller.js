import {asyncHandler} from "../../utils/asyncHandler.js";
import {Cart} from "../cart/cart.model.js";

const addToCart = asyncHandler(async (req, res) => {
  const {productId, quantity} = req.body;
  const userId = req.user.id;

  let cart = await Cart.findOne({userId});

  if (!cart) {
    cart = new Cart({userId, items: [{productId, quantity}]});
  } else {
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId,
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({productId, quantity});
    }
  }

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Added to cart successfully",
    data: {
      cart,
    },
  });
});

const getCartProducts = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({userId: req.user.id}).populate("items.productId");
  res.status(200).json({
    success: true,
    message: "cart product fetched successfully",
    data: {
      cart,
    },
  });
});

export {addToCart, getCartProducts};
