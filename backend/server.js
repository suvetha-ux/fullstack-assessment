const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for frontend communication

// ✅ Connect to MongoDB (Local Database)
mongoose.connect("mongodb://localhost:27017/salesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully (Local DB)"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Define Sales Schema & Model
const saleSchema = new mongoose.Schema({
  product: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const Sale = mongoose.model("Sale", saleSchema);

// ✅ Root Route (Fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("✅ Sales API is running...");
});

// ✅ Create Sale (POST /sales)
app.post("/sales", async (req, res) => {
  try {
    const { product, price, quantity } = req.body;

    // Validation check
    if (!product || !price || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSale = new Sale({ product, price, quantity });
    await newSale.save();
    
    res.status(201).json(newSale);
  } catch (error) {
    console.error("❌ Error adding sale:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Get All Sales (GET /sales)
app.get("/sales", async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (error) {
    console.error("❌ Error retrieving sales:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Delete Sale (DELETE /sales/:id)
app.delete("/sales/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSale = await Sale.findByIdAndDelete(id);
    
    if (!deletedSale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    res.json({ message: "Sale deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting sale:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});