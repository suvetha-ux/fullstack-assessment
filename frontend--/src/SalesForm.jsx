import { useState } from "react";

function SalesForm({ onSaleAdded }) {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!product || !price || !quantity) {
      alert("Please fill in all fields.");
      return;
    }

    const newSale = { product, price: Number(price), quantity: Number(quantity) };

    try {
      const response = await fetch("http://localhost:5000/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSale),
      });

      if (response.ok) {
        console.log("✅ Sale added successfully!");
        setProduct("");
        setPrice("");
        setQuantity("");
        onSaleAdded(); // Refresh sales list
      } else {
        console.error("❌ Failed to add sale");
      }
    } catch (error) {
      console.error("⚠️ Error adding sale:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Sale</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <button type="submit">Add Sale</button>
    </form>
  );
}

export default SalesForm;