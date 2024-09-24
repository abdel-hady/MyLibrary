import React from "react";
import { Link } from "react-router-dom";

const Basket = ({ basketItems, removeFromBasket }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Basket</h1>
      {basketItems.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {basketItems.map((item) => (
            <div key={item.id} className="p-4 bg-white shadow-md rounded-lg">
              <img
                src={`http://localhost:3000/${item.photo}`}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-xl font-bold mt-2">{item.name}</h2>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
                onClick={() => removeFromBasket(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <Link to="/checkout">
        <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">
          Checkout
        </button>
      </Link>
    </div>
  );
};

export default Basket;
