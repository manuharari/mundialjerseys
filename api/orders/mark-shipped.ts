import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db'; // The import path has been updated
import nodemailer from 'nodemailer';

async function sendEmail(to: string, subject: string, html: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { orderId, trackingNumber, shippingCarrier } = req.body;

        if (!orderId) {
            return res.status(400).json({ message: 'Order ID is required' });
        }

        const order = await prisma.order.update({
            where: { id: orderId },
            data: {
                status: 'shipped',
                trackingNumber,
                shippingCarrier,
                shippedAt: new Date(),
            },
            include: {
                items: {
                    include: {
                        product: true // This matches the relation field in your schema
                    }
                }
            }
        });

        if (order.email) {
            // This is a simplified email template; you may want to create a more robust one
            const emailHtml = `
                <p>Hello ${order.customerName || 'customer'},</p>
                <p>Your order #${order.id} has been shipped!</p>
                <p>Tracking Number: ${trackingNumber}</p>
                <p>Carrier: ${shippingCarrier}</p>
                <p>You can track your order here: [Link to tracking page]</p>
                <p>Thank you for your business!</p>
            `;
            await sendEmail(order.email, 'Your order has been shipped!', emailHtml);
        }

        res.status(200).json({ message: 'Order marked as shipped', order });
    } catch (error) {
        console.error('Failed to mark order as shipped:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
