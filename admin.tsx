
import { prisma } from '../lib/db';
import { useState } from 'react';

export async function getServerSideProps(){
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  return { props: { products: JSON.parse(JSON.stringify(products)) } }
}

export default function Admin({ products }: { products:any[] }){
  const [form, setForm] = useState<any>({ sku:'', title:'', team:'', price:169900, sizes:'S,M,L,XL', image:'' });
  async function create(e:any){
    e.preventDefault();
    const res = await fetch('/api/admin/create-product', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
    if (res.ok) location.reload();
  }
  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <form onSubmit={create} className="bg-white rounded-2xl p-4 shadow grid md:grid-cols-3 gap-4">
          {['sku','title','team','image'].map((k)=>(
            <label key={k} className="text-sm">{k.toUpperCase()}
              <input className="mt-1 w-full px-3 py-2 rounded-xl border" value={form[k]||''} onChange={e=>setForm({...form,[k]:e.target.value})}/>
            </label>
          ))}
          <label className="text-sm">PRICE (centavos)
            <input type="number" className="mt-1 w-full px-3 py-2 rounded-xl border" value={form.price} onChange={e=>setForm({...form,price:Number(e.target.value)})}/>
          </label>
          <label className="text-sm">SIZES
            <input className="mt-1 w-full px-3 py-2 rounded-xl border" value={form.sizes} onChange={e=>setForm({...form,sizes:e.target.value})}/>
          </label>
          <div className="md:col-span-3">
            <button className="px-4 py-2 rounded-2xl bg-black text-white">Guardar producto</button>
          </div>
        </form>

        <section className="grid md:grid-cols-3 gap-4">
          {products.map(p=> (
            <div key={p.id} className="bg-white rounded-2xl p-4 shadow">
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm opacity-60">{p.team} · ${ (p.price/100).toFixed(2) }</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}
