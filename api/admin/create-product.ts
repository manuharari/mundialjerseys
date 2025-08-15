import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db'; // <-- The import path has been updated

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== 'POST') return res.status(405).end();
  
  const { sku, title, team, price, sizes, image } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        sku,
        title,
        team,
        price,
        sizes,
        image,
      },
    });

    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
