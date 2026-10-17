import {Product} from "../modules/product/product.model.js";

const dummyProducts = [
  {
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "Premium over-ear headphones with industry-leading noise cancellation and 30-hour battery life.",
    price: 299.99,
    stock: 45,
  },
  {
    name: "Ultra HD Smart TV - 55 inch",
    description:
      "Experience breathtaking 4K resolution with vibrant colors and built-in smart streaming apps.",
    price: 499.0,
    stock: 20,
  },
  {
    name: "Pro Gaming Mouse",
    description:
      "Ergonomic gaming mouse with customizable RGB lighting and a 16,000 DPI optical sensor.",
    price: 59.99,
    stock: 120,
  },
  {
    name: "Mechanical Keyboard",
    description:
      "Tenkeyless mechanical keyboard featuring tactile blue switches and aluminum frame.",
    price: 89.5,
    stock: 65,
  },
  {
    name: "Smartphone Gimbal Stabilizer",
    description:
      "3-axis handheld gimbal for smartphones to shoot smooth, cinematic videos on the go.",
    price: 129.99,
    stock: 30,
  },
  {
    name: "Portable Bluetooth Speaker",
    description:
      "Waterproof portable speaker offering 360-degree sound and a durable, travel-friendly design.",
    price: 79.0,
    stock: 85,
  },
  {
    name: "Fitness Tracker Smartwatch",
    description:
      "Track your heart rate, sleep, and daily steps with this sleek, water-resistant smartwatch.",
    price: 149.99,
    stock: 50,
  },
  {
    name: "USB-C Hub Multiport Adapter",
    description:
      "Expand your laptop's connectivity with HDMI, SD card reader, and multiple USB 3.0 ports.",
    price: 34.99,
    stock: 200,
  },
];

const addDummyProductsToDB = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(dummyProducts);
    console.log("Dummy products added successfully.");
  } else {
    console.log("Products already exist in the database. Skipping...");
  }
};

export {addDummyProductsToDB};
