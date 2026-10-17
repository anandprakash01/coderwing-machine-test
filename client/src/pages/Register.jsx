import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/v1/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success !== false) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(`Error: ${data.message || "Failed to register"}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("A server error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md flex flex-col justify-center">
        <h1 className="text-3xl font-medium tracking-wide mb-2 text-gray-900">
          Create an account
        </h1>
        <p className="text-gray-500 mb-8">Enter your details below</p>

        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-red-500 transition-colors"
          />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email or Phone Number"
            required
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-red-500 transition-colors"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-red-500 transition-colors"
          />

          <div className="pt-4 flex flex-col gap-4">
            <button
              type="submit"
              className="w-full bg-[#DB4444] text-white py-3 rounded hover:bg-red-600 transition-colors font-medium"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="mt-6 text-gray-500 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-800 underline hover:text-black">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
