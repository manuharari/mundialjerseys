
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  // Here you'd verify Mercado Pago event and update order
  const { data } = req.body || {};
  try {
    const id = String(data?.id || req.query.id || '');
    if (id) {
      await prisma.order.update({ where: { id }, data: { status: 'paid', providerId: 'mp-'+id } });
    }
    res.status(200).json({ ok:true });
  } catch (e){
    res.status(200).json({ ok:true });
  }
}
