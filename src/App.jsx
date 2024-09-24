import { useState } from 'react';
import { Link, Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Checkout from './pages/checkout';
import Login from './pages/Auth';

function App() {
  const [basketItems, setBasketItems] = useState([]);

  const addToBasket = (product) => {
    setBasketItems((prev) => [...prev, product]);
  };

  return (
    <BrowserRouter>
      <div className="flex">
        <div className="flex-grow bg-gray-100 min-h-screen">
          <nav className="bg-blue-500 p-4 text-white">
            <ul className="flex justify-between">
              <div className='flex flex-row gap-4'>
              <li>
                <Link to="/products" className="hover:underline">Products</Link>
              </li>
              <li>
                <Link to="/orders" className="hover:underline">Orders</Link>
              </li>
              </div>
              <li>
                <Link to="/login" className="hover:underline">Login</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route 
              path="/products" 
              element={<Products addToBasket={addToBasket} />} 
            />
            <Route path="/orders" element={<Orders />} />
            <Route 
              path="/checkout" 
              element={<Checkout basketItems={basketItems} />} 
            />
            <Route 
              path="/login" 
              element={<Login />} 
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
