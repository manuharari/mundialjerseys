import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db'; // The import path has been updated

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).end();
    
    try {
        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                items: {
                    include: {
                        product: true // The name has been changed from 'Product' to 'product'
                    }
                }
            }
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
