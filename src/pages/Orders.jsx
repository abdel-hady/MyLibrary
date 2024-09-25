import OrderList from "../components/Orders/OrderList";

const Orders = () => {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-4xl font-bold mb-6">Manage Orders</h1>
			<OrderList />
		</div>
	);
};

export default Orders;
