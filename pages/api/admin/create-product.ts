
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== 'POST') return res.status(405).end();
  const { sku, title, team, price, sizes, image } = req.body || {};
  if (!sku || !title || !team || !price) return res.status(400).json({ ok:false, error:'missing fields' });
  const product = await prisma.product.create({ data: { sku, title, team, price: Number(price), sizes, image }});
  res.status(200).json({ ok:true, product });
}
