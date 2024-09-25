import { useState } from "react";
import { addOrder, updateOrder } from "../../api/orderService";

const OrderForm = ({ order, onOrderAdded, onOrderUpdated }) => {
  const [formValues, setFormValues] = useState({
    name: order?.personalDetails?.name || "",
    email: order?.personalDetails?.email || "",
    phone: order?.personalDetails?.phone || "",
    street: order?.shippingDetails?.street || "",
    cardNumber: order?.shippingDetails?.cardNumber || "",
    isApproved: order?.isApproved || false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
	e.preventDefault();
  
	const newOrder = {
	  personalDetails: {
		name: formValues.name,
		email: formValues.email,
		phone: formValues.phone,
	  },
	  shippingDetails: {
		street: formValues.street,
		cardNumber: formValues.cardNumber,
	  },
	  isApproved: formValues.isApproved,
	};
  
	try {
	  if (order) {
		await updateOrder(order.id, newOrder);
		onOrderUpdated();
	  } else {
		await addOrder(newOrder);
		onOrderAdded();
	  }
  
	  setFormValues({
		name: "",
		email: "",
		phone: "",
		street: "",
		cardNumber: "",
		isApproved: false,
	  });
  
	} catch (error) {
	  console.error("Error submitting the order:", error);
	}
  };
  

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-4">
        {order ? "Edit Order" : "Add Order"}
      </h2>

      <input
        type="text"
        name="name"
        value={formValues.name}
        onChange={handleInputChange}
        placeholder="Customer Name"
        className="border p-2 mb-2 w-full rounded-md"
        required
      />

      <input
        type="email"
        name="email"
        value={formValues.email}
        onChange={handleInputChange}
        placeholder="Customer Email"
        className="border p-2 mb-2 w-full rounded-md"
        required
      />

      <input
        type="text"
        name="phone"
        value={formValues.phone}
        onChange={handleInputChange}
        placeholder="Customer Phone"
        className="border p-2 mb-2 w-full rounded-md"
        required
      />

      <input
        type="text"
        name="street"
        value={formValues.street}
        onChange={handleInputChange}
        placeholder="Shipping Address"
        className="border p-2 mb-2 w-full rounded-md"
        required
      />

      <input
        type="text"
        name="cardNumber"
        value={formValues.cardNumber}
        onChange={handleInputChange}
        placeholder="Card Number"
        className="border p-2 mb-2 w-full rounded-md"
        required
      />

      <label className="inline-flex items-center mb-4">
        <input
          type="checkbox"
          name="isApproved"
          checked={formValues.isApproved}
          onChange={handleInputChange}
          className="mr-2"
        />
        Approve Order
      </label>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        {order ? "Update Order" : "Add Order"}
      </button>
    </form>
  );
};

export default OrderForm;
