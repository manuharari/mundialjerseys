
import Link from 'next/link';
export default function ProductCard({p}:{p:any}){
  return (
    <Link href={`/product/${p.sku}`} className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition block">
      <div className="aspect-[4/3] bg-neutral-100 rounded-xl mb-3 overflow-hidden">
        {p.image ? <img src={p.image} className="w-full h-full object-cover" /> : null}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">{p.title}</div>
          <div className="text-xs opacity-70">{p.team}</div>
        </div>
        <div className="font-bold">${(p.price/100).toFixed(2)}</div>
      </div>
    </Link>
  )
}
