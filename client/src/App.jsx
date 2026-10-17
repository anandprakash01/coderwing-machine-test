import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <nav className="flex items-center justify-between px-8 py-4 shadow-sm bg-white">
        <Link to="/" className="text-xl font-bold text-gray-900">
          Exclusive
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-red-500">
            Home
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-red-500">
            Cart
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-red-500">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-[#DB4444] text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
