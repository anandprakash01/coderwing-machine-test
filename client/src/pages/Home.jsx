import {useState, useEffect} from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/product/all")
      .then(res => res.json())
      .then(responseData => {
        if (responseData.success && responseData.data && responseData.data.products) {
          setProducts(responseData.data.products);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const addToCart = productId => {
    fetch("http://localhost:3000/api/v1/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({productId, quantity: 1}),
    })
      .then(res => res.json())
      .then(data => alert("Added to cart!"))
      .catch(err => console.error(err));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8 border-l-8 border-red-500 pl-3">
        Explore Our Products
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div
              key={product._id}
              className="border rounded-lg p-4 group hover:shadow-lg transition-shadow bg-gray-50 flex flex-col"
            >
              <div className="relative h-48 mb-4 bg-gray-200 rounded flex items-center justify-center overflow-hidden p-4 text-center">
                <span className="text-gray-500 font-medium">No Image</span>

                <button
                  onClick={() => addToCart(product._id)}
                  className="absolute bottom-0 left-0 right-0 bg-black text-white text-center py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  Add To Cart
                </button>
              </div>
              <h3 className="font-medium text-lg mt-auto">{product.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mt-1 mb-2">
                {product.description}
              </p>
              <p className="text-red-500 font-semibold">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
