import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db'; // <-- The import path has been updated

export const config = { api: { bodyParser: { sizeLimit: '1mb' } } }

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== 'POST') return res.status(405).end();
  
  const { cart } = req.body;
  
  // Here you would typically process the cart and create a Mercado Pago preference.
  // For now, we'll just return a success message.
  
  // Log the cart to the console for debugging
  console.log('Received cart:', cart);
  
  res.status(200).json({ message: 'Preference created successfully.' });
}
