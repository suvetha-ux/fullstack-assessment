import React, { useState } from 'react';

function AddSale() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !price || !quantity) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName, price, quantity })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Sale added successfully');
        setProductName('');
        setPrice('');
        setQuantity('');
      } else {
        alert(data.message || 'Failed to add sale. Please try again');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add sale. Please try again');
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
          <label>Price:</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
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
        <button type="submit">Add Sale</button>
      </form>
    </div>
  );
}

export default AddSale;