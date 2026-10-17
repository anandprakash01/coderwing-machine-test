import {useState, useEffect} from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/cart")
      .then(res => res.json())
      .then(data => setCartItems(data.items || []))
      .catch(err => console.error(err));
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="w-full">
            {/* Header row */}
            <div className="grid grid-cols-4 gap-4 p-4 shadow-sm bg-white rounded font-medium mb-4 text-gray-700">
              <div className="col-span-2">Product</div>
              <div>Price</div>
              <div>Quantity</div>
            </div>

            {/* Cart Items */}
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 p-4 shadow-sm bg-white rounded items-center mb-4"
              >
                <div className="col-span-2 flex items-center gap-4">
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="w-16 h-16 object-contain"
                  />
                  <span className="font-medium">{item.productId.name}</span>
                </div>
                <div className="text-gray-700">${item.productId.price}</div>
                <div>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    className="w-16 border rounded p-1 text-center"
                    readOnly
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <div className="w-full md:w-1/3 border-2 border-gray-900 rounded p-6">
              <h3 className="text-xl font-medium mb-4">Cart Total</h3>
              <div className="flex justify-between border-b pb-2 mb-2">
                <span>Subtotal:</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-4">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>
              <button className="w-full bg-[#DB4444] text-white py-3 rounded hover:bg-red-600 transition-colors">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
