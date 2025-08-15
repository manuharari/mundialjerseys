
import { GetServerSidePropsContext } from 'next';
import Header from '../../components/Header';
import { prisma } from '../../lib/db';
import { useState } from 'react';

export async function getServerSideProps(ctx: GetServerSidePropsContext){
  const sku = String(ctx.params?.sku);
  const product = await prisma.product.findUnique({ where: { sku } });
  if (!product) return { notFound: true };
  return { props: { product: JSON.parse(JSON.stringify(product)) } }
}

export default function Product({ product }: { product:any }){
  const [size, setSize] = useState('M');
  return (
    <div>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-4 shadow">
          <div className="aspect-square bg-neutral-100 rounded-xl overflow-hidden">
            {product.image ? <img src={product.image} className="w-full h-full object-cover" /> : null}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-extrabold">{product.title}</h1>
          <div className="mt-2 text-xl font-bold">${(product.price/100).toFixed(2)}</div>
          <div className="mt-4">
            <label className="block text-sm mb-1">Talla</label>
            <div className="flex gap-2">
              {['S','M','L','XL'].map(s => (
                <button key={s} onClick={()=>setSize(s)} className={`px-3 py-2 rounded-xl border ${size===s?'bg-black text-white':'bg-white'}`}>{s}</button>
              ))}
            </div>
          </div>
          <form method="POST" action="/api/mercadopago/create-preference" className="mt-6">
            <input type="hidden" name="sku" value={product.sku} />
            <input type="hidden" name="size" value={size} />
            <button className="px-5 py-3 rounded-2xl bg-emerald-600 text-white">Comprar con Mercado Pago</button>
          </form>
        </div>
      </main>
    </div>
  )
}
