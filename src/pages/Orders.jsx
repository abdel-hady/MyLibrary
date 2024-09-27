import { useEffect, useState } from "react";
import OrderList from "../components/Orders/OrderList";
import OrderForm from "../components/Orders/OrderForm";
import { getAllOrders } from "../api/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const orders = await getAllOrders();
    setOrders(orders);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Manage Orders</h1>
      <OrderList reloadOrders={loadOrders} />
    </div>
  );
};

export default Orders;
