import { useEffect, useState } from "react";

function SalesList() {
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    try {
      const response = await fetch("http://localhost:5000/sales");
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div>
      <h2>Sales List</h2>
      <ul>
        {sales.map((sale) => (
          <li key={sale._id}>
            {sale.product} - ${sale.price} x {sale.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SalesList;