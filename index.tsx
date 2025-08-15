
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { prisma } from '../lib/db';

export async function getServerSideProps(){
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  return { props: { products: JSON.parse(JSON.stringify(products)) } }
}

export default function Home({ products }: { products:any[] }){
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        <section className="rounded-2xl p-10 bg-gradient-to-b from-sky-700 to-sky-500 text-white">
          <h1 className="text-4xl font-extrabold">Vive el Mundial, viste la pasión</h1>
          <p className="mt-2 opacity-90">Camisetas oficiales y personalizadas — edición limitada.</p>
          <div className="mt-6 flex gap-3">
            <a href="#shop" className="px-5 py-3 rounded-2xl bg-white text-sky-700 font-semibold">Comprar ahora</a>
            <a href="/admin" className="px-5 py-3 rounded-2xl border border-white/50">Admin</a>
          </div>
        </section>

        <section id="shop" className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(p => <ProductCard key={p.id} p={p} />)}
        </section>
      </main>
    </div>
  )
}
