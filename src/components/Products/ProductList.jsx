// src/components/Products/ProductList.js
import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../../api/ProductService";

const ProductList = ({ addToBasket }) => {
  const [products, setProducts] = useState([]);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    loadProducts();
    const userRole = localStorage.getItem("user-role");
    setUserRole(userRole || "");
  }, []);

  const loadProducts = async () => {
    const products = await getAllProducts();
    setProducts(products);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="p-4 bg-white shadow-md rounded-lg">
            <img
              src={`http://localhost:3000/${product.photo}`}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-bold mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            {userRole !== "admin" && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                onClick={() => addToBasket(product)}
              >
                Add to Basket
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
