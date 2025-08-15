
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== 'GET') return res.status(405).end();
  const orders = await prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: 'desc' } });
  res.status(200).json({ ok:true, orders });
}
