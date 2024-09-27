import { useState } from "react";
import { useBasket } from "../context/BasketContext";
import { addOrder } from "../api/orderService";

const Checkout = () => {
  const { basketItems, clearBasket } = useBasket();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      productIds: basketItems.map((item) => item.id),
      shippingDetails: { street, cardNumber },
      personalDetails: { name, email, phone },
      isApproved: false,
    };

    try {
      const response = await addOrder(order);
      setOrderStatus("Order placed successfully!");
      clearBasket();
      setFormErrors({});
    } catch (error) {
      if (error.response && error.response.data) {
        const backendErrors = error.response.data.errors;
        const formErrors = backendErrors.reduce((acc, curr) => {
          acc[curr.field] = curr.errors;
          return acc;
        }, {});
        setFormErrors(formErrors);
      } else {
        setOrderStatus("Failed to place the order. Please try again.");
        console.error("Error placing the order:", error);
      }
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

          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Customer Name"
              className="border p-2 mb-1 w-full rounded-md"
            />
            {formErrors['personalDetails.name'] && (
              <ul className="text-red-600">
                {formErrors['personalDetails.name'][0]}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Customer Email"
              className="border p-2 mb-1 w-full rounded-md"
            />
            {formErrors['personalDetails.email'] && (
              <ul className="text-red-600">
                {formErrors['personalDetails.email'][0]}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Customer Phone"
              className="border p-2 mb-1 w-full rounded-md"
            />
            {formErrors['personalDetails.phone'] && (
              <ul className="text-red-600">
                {formErrors['personalDetails.phone'][0]}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Shipping Address"
              className="border p-2 mb-1 w-full rounded-md"
            />
            {formErrors['shippingDetails.street'] && (
              <ul className="text-red-600">
                {formErrors['shippingDetails.street'][0]}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Card Number"
              className="border p-2 mb-1 w-full rounded-md"
            />
            {formErrors['shippingDetails.cardNumber'] && (
              <ul className="text-red-600">
                {formErrors['shippingDetails.cardNumber'][0]}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Place Order
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
