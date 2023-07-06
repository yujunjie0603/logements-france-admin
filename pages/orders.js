import Layout from '@/components/Layout'
import axios from 'axios';
import { useEffect, useState } from 'react';

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get('/api/orders').then(response => {
            console.log(response.data);
            setOrders(response.data)
        })
    }, []);
  return (
    <Layout>
        <h1>Orders</h1>
        <table className='basic'>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Paid</td>
                    <td>Recipient</td>
                    <td>Products</td>
                </tr>
            </thead>
            <tbody>
                {orders.length > 0 && orders.map(order => (
                <tr key={order._id}>
                    <td>{(new Date(order.createdAt)).toLocaleString()}
                    </td>
                    <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                    {order.paid ? 'YES' : 'NO'}
                    </td>
                    <td>
                    {order.name} {order.email}<br />
                    {order.city} {order.postalCode} {order.country}<br />
                    {order.streetAddress}
                    </td>
                    <td>
                    {order.line_items.map((l,i) => (
                        <>
                        <lable key={i}>
                            {l.price_data?.product_data.name} x
                            {l.quantity}<br />
                        </lable>
                        </>
                    ))}
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </Layout>
  );
}

export default OrdersPage