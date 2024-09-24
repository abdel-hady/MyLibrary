import { useEffect, useState } from "react";
import { getAllOrders, deleteOrder } from "../../api/OrderService";
import OrderForm from "./OrderForm";

const OrderList = () => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		loadOrders();
	}, []);

	const loadOrders = async () => {
		const orders = await getAllOrders();
		setOrders(orders);
	};

	const handleDelete = async (id) => {
		await deleteOrder(id);
		loadOrders();
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Orders</h1>
			<OrderForm onOrderAdded={loadOrders} />
			{orders.map((order) => (
				<div key={order.id} className="p-4 bg-white shadow-md rounded-lg mb-4">
					<h2 className="text-xl font-bold">Order #{order.id}</h2>
					<p>Shipping to: {order.shippingDetails.street}</p>
					<p>Customer: {order.personalDetails.name}</p>
					<p>Products: {order.products.map((p) => p.name).join(", ")}</p>
					<div className="mt-4 flex justify-between">
						<button
							className="bg-red-500 text-white px-4 py-2 rounded-md"
							onClick={() => handleDelete(order.id)}
						>
							Delete
						</button>
						<OrderForm order={order} onOrderUpdated={loadOrders} />
					</div>
				</div>
			))}
		</div>
	);
};

export default OrderList;
