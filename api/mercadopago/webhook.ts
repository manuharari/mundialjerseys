import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db'; // The import path has been updated

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
      // Find the order in your database and update its status
      await prisma.order.update({
        where: { paymentId: paymentId },
        data: { status: 'paid' },
      });
      console.log(`Order with payment ID ${paymentId} updated to paid.`);
    }

    res.status(200).json({ message: 'Webhook received successfully' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
