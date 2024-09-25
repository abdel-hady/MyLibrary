// src/App.js
import { Link, Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Products from './pages/Products';
import Orders from './pages/Orders';
import { BasketProvider } from './context/BasketContext'; // Import the BasketProvider
import Checkout from './pages/checkout';
import Login from './pages/Auth';

function App() {
  return (
    <BasketProvider>
      <BrowserRouter>
        <div className="flex">
          <div className="flex-grow bg-gray-100 min-h-screen">
            <nav className="bg-blue-500 p-4 text-white">
              <ul className="flex space-x-4">
                <li>
                  <Link to="/products" className="hover:underline">Products</Link>
                </li>
                <li>
                  <Link to="/orders" className="hover:underline">Orders</Link>
                </li>
                <li>
                  <Link to="/login" className="hover:underline">Login</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </BasketProvider>
  );
}

export default App;
