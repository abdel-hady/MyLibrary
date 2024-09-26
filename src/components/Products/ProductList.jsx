import { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from "../../api/productService";
import { BASE_URL } from "../../api/axiosInstance";
import { useAuth } from '../../context/AuthContext';
import ProductForm from './ProductForm';

const ProductList = ({ addToBasket }) => {
  const [products, setProducts] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadProducts();
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
              src={`${BASE_URL}/${product.photo}`}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-bold mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <div className="mt-4 flex justify-between">
            {isAuthenticated? (
              <div>
                <ProductForm product={product} onProductUpdated={loadProducts} />
                  <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
                
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => addToBasket(product)}
              >
                Add to Basket
              </button>
            )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
