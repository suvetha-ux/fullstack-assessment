import React, { useState } from 'react';
import axios from 'axios';

function AddSale({ onSaleAdded }) {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!productName || !quantity || !price) {
      alert('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/sales', {
        productName,
        quantity: parseInt(quantity),  // Ensure quantity is a number
        price: parseFloat(price)       // Ensure price is a float
      });

      if (response.status === 201) {
        alert('Sale added successfully');
        onSaleAdded();  // Refresh sales list after adding
        setProductName('');
        setQuantity('');
        setPrice('');
      }
    } catch (error) {
      console.error('Failed to add sale:', error.response?.data?.message || error.message);
      alert('Failed to add sale. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Sale</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input 
            type="text" 
            value={productName} 
            onChange={(e) => setProductName(e.target.value)} 
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
          />
        </div>
        <div>
          <label>Price:</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
          />
        </div>
        <button type="submit">Add Sale</button>
      </form>
    </div>
  );
}

export default AddSale;