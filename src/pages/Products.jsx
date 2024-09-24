import { useState } from "react";
import ProductList from "../components/Products/ProductList";
import Sidebar from "../components/Sidebar"; // Adjust the import based on your folder structure

const Products = () => {
  const [basket, setBasket] = useState([]);

  const removeFromBasket = (id) => {
    setBasket((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="mx-auto flex flex-row">
      <div className="container mx-auto flex-1 p-4 ">
        <ProductList setBasket={setBasket} />
      </div>
      <Sidebar basketItems={basket} removeFromBasket={removeFromBasket} />
    </div>
  );
};

export default Products;
