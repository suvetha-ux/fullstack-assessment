import React, { useState } from 'react';
import AddSale from './components/AddSale.jsx';
import SalesList from './SalesList.jsx';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleSaleAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="container mt-5">
      <h1>Sales Management App</h1>
      <AddSale onSaleAdded={handleSaleAdded} />
      <SalesList refresh={refresh} />
    </div>
  );
}

export default App;