
import Header from '../components/Header';
import { prisma } from '../lib/db';
import { useState } from 'react';

export async function getServerSideProps(){
  const orders = await prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: 'desc' } });
  return { props: { orders: JSON.parse(JSON.stringify(orders)) } }
}

export default function Orders({ orders }: { orders:any[] }){
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-10 space-y-6">
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <table className="w-full text-sm bg-white rounded-2xl overflow-hidden shadow">
          <thead className="bg-neutral-100 text-left">
            <tr><th className="p-2">ID</th><th>Monto</th><th>Estado</th><th>Cliente</th><th>Tracking</th><th>Fecha</th></tr>
          </thead>
          <tbody>
            {orders.map(o=> (
              <tr key={o.id} className="border-t">
                <td className="p-2">{o.id}</td>
                <td className="p-2">${(o.amount/100).toFixed(2)} {o.currency}</td>
                <td className="p-2">{o.status}</td>
                <td className="p-2">{o.email || '-'}</td>
                <td className="p-2">{o.shippingCarrier||'-'} {o.trackingNumber||''}</td>
                <td className="p-2">{new Date(o.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ShipForm />
      </main>
    </div>
  )
}

function ShipForm(){
  const [id, setId] = useState('');
  const [carrier, setCarrier] = useState('Skydropx');
  const [tracking, setTracking] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  async function markShipped(e:any){
    e.preventDefault();
    const res = await fetch('/api/orders/mark-shipped', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ id, carrier, tracking, email, notes })
    });
    const data = await res.json();
    if (data?.ok){ alert('Pedido marcado como enviado'); location.reload(); }
    else alert('Error');
  }

  return (
    <form onSubmit={markShipped} className="bg-white rounded-2xl p-4 shadow grid md:grid-cols-6 gap-3 text-sm">
      <label className="md:col-span-2">ID de Orden
        <input className="mt-1 w-full px-3 py-2 rounded-xl border" value={id} onChange={e=>setId(e.target.value)} placeholder="ORD-..." />
      </label>
      <label>Paquetería
        <input className="mt-1 w-full px-3 py-2 rounded-xl border" value={carrier} onChange={e=>setCarrier(e.target.value)} />
      </label>
      <label>Guía
        <input className="mt-1 w-full px-3 py-2 rounded-xl border" value={tracking} onChange={e=>setTracking(e.target.value)} />
      </label>
      <label>Correo cliente
        <input className="mt-1 w-full px-3 py-2 rounded-xl border" value={email} onChange={e=>setEmail(e.target.value)} placeholder="cliente@correo.com" />
      </label>
      <label className="md:col-span-6">Notas
        <input className="mt-1 w-full px-3 py-2 rounded-xl border" value={notes} onChange={e=>setNotes(e.target.value)} />
      </label>
      <div className="md:col-span-6">
        <button className="px-4 py-2 rounded-2xl bg-black text-white">Marcar como enviado + email</button>
      </div>
    </form>
  );
}
