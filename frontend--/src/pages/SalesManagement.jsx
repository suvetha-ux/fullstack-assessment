import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const SalesManagement = () => {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

  // ✅ Function to fetch sales with token
  const fetchSales = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const response = await axios.get('http://localhost:5000/api/sales', {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });
      setSales(response.data);
    } catch (error) {
      console.error('Failed to fetch sales:', error);
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please login again.');
        navigate('/'); // Redirect to login if unauthorized
      }
    }
  };

  // ✅ Function to delete a sale
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/sales/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchSales(); // Refresh sales list after delete
    } catch (error) {
      console.error('Failed to delete sale:', error);
    }
  };

  // ✅ Redirect to edit page
  const handleEdit = (id) => {
    navigate(`/edit-sale/${id}`);
  };

  // ✅ Redirect to view page
  const handleView = (id) => {
    navigate(`/view-sale/${id}`);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Sales Management</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate('/add-sale')}
      >
        Add Sale
      </button>
      {sales.length === 0 ? (
        <p>No sales records found.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.productName}</td>
                <td>{sale.price}</td>
                <td>{sale.quantity}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleView(sale._id)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(sale._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(sale._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SalesManagement;