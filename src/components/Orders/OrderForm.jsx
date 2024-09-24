import { useState } from "react";
import { addOrder, updateOrder } from "../../api/OrderService";

const OrderForm = ({ order, onOrderAdded, onOrderUpdated }) => {
	const [name, setName] = useState(order ? order.personalDetails.name : "");
	const [email, setEmail] = useState(order ? order.personalDetails.email : "");
	const [phone, setPhone] = useState(order ? order.personalDetails.phone : "");
	const [street, setStreet] = useState(
		order ? order.shippingDetails.street : ""
	);
	const [cardNumber, setCardNumber] = useState(
		order ? order.shippingDetails.cardNumber : ""
	);
	const [isApproved, setIsApproved] = useState(
		order ? order.isApproved : false
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newOrder = {
			personalDetails: { name, email, phone },
			shippingDetails: { street, cardNumber },
			isApproved,
		};

		if (order) {
			await updateOrder(order.id, newOrder);
			onOrderUpdated();
		} else {
			await addOrder(newOrder);
			onOrderAdded();
		}

		// Reset the form fields after submission
		setName("");
		setEmail("");
		setPhone("");
		setStreet("");
		setCardNumber("");
		setIsApproved(false);
	};

	return (
		<form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg mb-4">
			<h2 className="text-xl font-bold mb-4">
				{order ? "Edit Order" : "Add Order"}
			</h2>

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

			<label className="inline-flex items-center mb-4">
				<input
					type="checkbox"
					checked={isApproved}
					onChange={(e) => setIsApproved(e.target.checked)}
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
