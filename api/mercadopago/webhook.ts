import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Here you'd verify Mercado Pago event and update order
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Example of handling a webhook
  try {
    const event = req.body;
    // Process the event here
    console.log('Received webhook event:', event);

    // If the event is related to a payment, you can update your database
    if (event.type === 'payment') {
      const paymentId = event.data.id;
      // First, find the order using the providerId (which corresponds to the Mercado Pago payment ID)
      const order = await prisma.order.findFirst({
        where: { providerId: paymentId },
      });

      // If an order is found, update its status
      if (order) {
        await prisma.order.update({
          where: { id: order.id }, // Now we use the unique 'id' to update
          data: { status: 'paid' },
        });
        console.log(`Order with payment ID ${paymentId} updated to paid.`);
      } else {
        console.log(`No order found for payment ID ${paymentId}.`);
      }
    }

    res.status(200).json({ message: 'Webhook received successfully' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
