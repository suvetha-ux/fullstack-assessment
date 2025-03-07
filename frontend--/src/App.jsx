import { useState } from "react";
import SalesForm from "./SalesForm";
import SalesList from "./SalesList";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h1>Sales Management App</h1>
      <SalesForm onSaleAdded={() => setRefresh(!refresh)} />
      <SalesList key={refresh} />
    </div>
  );
}

export default App;
