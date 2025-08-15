
# MundialJerseys — Ecommerce ES/EN con Mercado Pago + Admin + Envíos

## Requisitos
- Node 18+, npm
- SQLite (incluido), Prisma

## Instalación
```bash
npm i
cp .env.example .env
npm run db:push
npm run db:seed
npm run dev
```
Abrir: http://localhost:3000

## Funciones clave
- Catálogo y producto con tallas.
- Checkout (endpoint placeholder para preferencia MP).
- Webhook para marcar órdenes como pagadas.
- Admin Dashboard para productos.
- Panel de Pedidos con **marcar enviado** + **email** al cliente.

## Variables de entorno
Ver `.env.example` — agrega tus credenciales reales de MP y SMTP.

## Deploy gratis en Vercel + dominio propio
1. Sube este repo a GitHub.
2. Crea un proyecto en Vercel y conéctalo.
3. En Vercel → **Environment Variables**: `DATABASE_URL` (p.ej. `file:./dev.db` para tests o una base remota), `MP_ACCESS_TOKEN`, `MP_WEBHOOK_URL`, `SMTP_*`, `FROM_EMAIL`.
4. Vercel → **Domains**: añade tu dominio y sigue los DNS.
5. Ejecuta `npx prisma db push` en **Run Command** de Vercel para crear las tablas.

_Última actualización: 2025-08-14_
