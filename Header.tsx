
import Link from 'next/link';
export default function Header(){
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link href="/" className="font-extrabold text-xl">MUNDIALJERSEYS</Link>
        <nav className="ml-auto flex items-center gap-4 text-sm">
          <Link href="/">{'Tienda'}</Link>
          <Link href="/admin">{'Admin'}</Link>
          <Link href="/orders">{'Pedidos'}</Link>
        </nav>
      </div>
    </header>
  )
}
