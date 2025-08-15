import Header from '@/components/Header'; // The import path has been updated
import { prisma } from '@/lib/db';
import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

interface Order {
  id: string;
  createdAt: Date;
  customerName: string;
  email: string;
  status: string;
  total: number;
  trackingNumber?: string | null;
  shippingCarrier?: string | null;
  shippedAt?: Date | null;
  items: {
    id: string;
    productId: string;
    orderId: string;
    quantity: number;
    size: string;
    product: {
      id: string;
      title: string;
      team: string;
      price: number;
    };
  }[];
}

interface OrdersProps {
  initialOrders: Order[];
}

const OrdersPage: NextPage<OrdersProps> = ({ initialOrders }) => {
  const [orders, setOrders] = useState(initialOrders);

  // This function would be called when you want to update an order
  const handleMarkShipped = async (orderId: string, trackingNumber: string, shippingCarrier: string) => {
    try {
      const response = await fetch('/api/orders/mark-shipped', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, trackingNumber, shippingCarrier }),
      });

      if (response.ok) {
        // You might want to refresh the orders list here
        // or update the state with the new order data
        const updatedOrder = await response.json();
        setOrders(prevOrders => prevOrders.map(order =>
          order.id === orderId ? { ...order, ...updatedOrder.order } : order
        ));
      } else {
        console.error('Failed to mark order as shipped');
      }
    } catch (error) {
      console.error('Error marking order as shipped:', error);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>Orders Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Orders Dashboard
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Order #{order.id}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <p><strong>Customer:</strong> {order.customerName}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Total:</strong> ${(order.total / 100).toFixed(2)}</p>
              
              {order.status === 'shipped' && (
                <>
                  <p><strong>Tracking Number:</strong> {order.trackingNumber}</p>
                  <p><strong>Carrier:</strong> {order.shippingCarrier}</p>
                </>
              )}

              <h3 className="font-semibold mt-4 mb-2">Items:</h3>
              <ul className="list-disc list-inside">
                {order.items.map((item) => (
                  <li key={item.id} className="text-gray-700">
                    {item.quantity} x {item.product.title} ({item.size})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            product: true
          }
        },
      },
    });

    return {
      props: {
        initialOrders: JSON.parse(JSON.stringify(orders)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        initialOrders: [],
      },
    };
  }
}

export default OrdersPage;
