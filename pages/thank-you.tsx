
import Header from '../components/Header';
export default function ThankYou({}){
  return (
    <div>
      <Header />
      <main className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-extrabold">¡Gracias por tu compra!</h1>
        <p className="mt-2 opacity-80">Te enviaremos confirmación por correo cuando se verifique el pago.</p>
        <a href="/" className="mt-6 inline-block px-5 py-3 rounded-2xl bg-black text-white">Volver a la tienda</a>
      </main>
    </div>
  )
}
