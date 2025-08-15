
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export const config = { api: { bodyParser: { sizeLimit: '1mb' } } }

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== 'POST') return res.status(405).end();
  const { sku, size } = req.body || req.query;
  const product = await prisma.product.findUnique({ where: { sku: String(sku) } });
  if (!product) return res.status(404).json({ ok:false, error:'product not found' });

  // Create a fake order ID now; in production, you'd create a preference via Mercado Pago SDK
  const id = `ORD-${Date.now()}`;
  await prisma.order.create({
    data: {
      id, amount: product.price, method:'mercadopago', status:'created', email: null, items: { create: [
        { name: product.title, size: String(size||'M'), quantity: 1, price: product.price }
      ]}
    }
  });
  // Simulate redirect URL (in real: create preference and redirect to init_point)
  res.status(200).json({ ok:true, redirect: `/thank-you?id=${id}` });
}
