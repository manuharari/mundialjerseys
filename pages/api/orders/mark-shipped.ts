
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';
import nodemailer from 'nodemailer';

async function sendEmail(to:string, subject:string, html:string){
  if (!process.env.SMTP_HOST) return;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });
  await transporter.sendMail({
    from: process.env.FROM_EMAIL || 'no-reply@mundialjerseys.mx',
    to, subject, html
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== 'POST') return res.status(405).end();
  const { id, carrier, tracking, email, notes } = req.body || {};
  if (!id) return res.status(400).json({ ok:false, error:'missing id' });
  const order = await prisma.order.update({
    where: { id },
    data: {
      shippingCarrier: carrier || null,
      trackingNumber: tracking || null,
      status: 'shipped',
      shippedAt: new Date(),
      notes: notes || null
    }
  });

  if (email) {
    const link = tracking ? `https://www.google.com/search?q=${encodeURIComponent(carrier+' '+tracking)}` : '';
    await sendEmail(email, 'Tu pedido fue enviado', `<p>Tu pedido <b>${order.id}</b> ha sido enviado.</p>
    <p>Paquetería: <b>${carrier||'-'}</b> · Guía: <b>${tracking||'-'}</b></p>
    ${link ? `<p>Seguimiento: <a href="${link}">${link}</a></p>` : ''}
    <p>Gracias por comprar en MundialJerseys.</p>`);
  }

  res.status(200).json({ ok:true, order });
}
