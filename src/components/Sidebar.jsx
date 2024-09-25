// src/components/Sidebar.js
import { Link } from "react-router-dom";

const Sidebar = ({ basketItems, removeFromBasket }) => {
  return (
    <div className="bg-gray-200 w-64 p-4">
      <h2 className="text-xl font-bold mb-4">Basket</h2>
      {basketItems.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <div>
          {basketItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name}</span>
              <button
                className="bg-red-500 text-white px-2 rounded"
                onClick={() => removeFromBasket(item.id)}
              >
                X
              </button>
            </div>
          ))}
          <Link to="/checkout">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
              Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
