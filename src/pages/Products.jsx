// src/pages/Products.js
import ProductList from "../components/Products/ProductList";
import Sidebar from "../components/Sidebar";
import { useBasket } from "../context/BasketContext";

const Products = () => {
  const { basketItems, addToBasket, removeFromBasket } = useBasket(); // Access basket functions

  return (
    <div className="mx-auto flex flex-row">
      <div className="container mx-auto flex-1 p-4">
        <ProductList addToBasket={addToBasket} />
      </div>
      <Sidebar basketItems={basketItems} removeFromBasket={removeFromBasket} />
    </div>
  );
};

export default Products;
