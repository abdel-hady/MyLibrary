import { useState } from "react";

const Checkout = ({ basketItems }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create order payload
    const order = {
      productIds: basketItems.map(item => item.id),
      shippingDetails: { street, cardNumber },
      personalDetails: { name, email, phone },
      isApproved: false,
      status: "pending",
    };

    // Here you would send the order to your API
    console.log(order);
    // Reset fields and basket
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg">
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
    </div>
  );
};

export default Checkout;
