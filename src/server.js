const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 3000, async () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

const Product = [];
app.get("/products", async (req, res) => {
  try {
    res.json({
      products: Product,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/products/:id", (req, res) => {
  const product = Product.filter(item =>item.id.toString() == req.params.id);
  res.json({product: !product?[]:product});
});

app.post("/products", async (req, res) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    id:(Math.random().toFixed(6)*1000000)
  };
  Product.push(newProduct);
  try {
    res.json({
      newProduct,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
