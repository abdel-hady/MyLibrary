// src/pages/Checkout.js
import { useState } from "react";
import { useBasket } from "../context/BasketContext"; // Use basket context
import { addOrder } from "../api/OrderService"; // Import the addOrder API

const Checkout = () => {
  const { basketItems } = useBasket();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      productIds: basketItems.map((item) => item.id),
      shippingDetails: { street, cardNumber },
      personalDetails: { name, email, phone },
      status: "pending",
    };

    try {
      const response = await addOrder(order);
      setOrderStatus("Order placed successfully!");
      console.log("Order placed:", response.data);
    } catch (error) {
      setOrderStatus("Failed to place the order. Please try again.");
      console.error("Error placing the order:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {basketItems.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Products in Basket</h2>
          <ul>
            {basketItems.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>

          {/* Personal and Shipping Details */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Customer Name"
            className="border p-2 mb-2 w-full rounded-md"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Customer Email"
            className="border p-2 mb-2 w-full rounded-md"
            required
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Customer Phone"
            className="border p-2 mb-2 w-full rounded-md"
            required
          />
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Shipping Address"
            className="border p-2 mb-2 w-full rounded-md"
            required
          />
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Card Number"
            className="border p-2 mb-2 w-full rounded-md"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Place Order
          </button>
        </form>
      )}
      {/* Display order status */}
      {orderStatus && <p className="mt-4">{orderStatus}</p>}
    </div>
  );
};

export default Checkout;
