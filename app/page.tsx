export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-slate-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/25 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">
          <a href="#" className="font-semibold tracking-wide">
            A escasos metros del mar
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/85">
            <a href="#apartamento" className="hover:text-white">Apartamento</a>
            <a href="#ubicacion" className="hover:text-white">Ubicación</a>
            <a href="#galeria" className="hover:text-white">Galería</a>
            <a href="#reservar" className="hover:text-white">Reservar</a>
          </nav>

          <a
            href="#reservar"
            className="bg-white text-slate-900 px-5 py-2 rounded-2xl text-sm font-medium"
          >
            Reservar
          </a>
        </div>
      </header>
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/portada.jpg"
            alt="Apartamento turístico en El Campello"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45"></div>
        </div>

        <div className="relative z-10 max-w-5xl text-center text-white">
          <p className="uppercase tracking-[0.35em] text-white/80 mb-6">
            El Campello · Alicante
          </p>

          <h1 className="text-5xl md:text-8xl font-semibold mb-6">
            A escasos metros del mar
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-10">
            Apartamento turístico junto al paseo marítimo de El Campello.
          </p>

          <div className="flex gap-4 justify-center mb-16">
            <a href="#reservar" className="bg-slate-900 text-white px-7 py-4 rounded-2xl">
              Reservar
            </a>
            <a href="#apartamento" className="border border-white/60 text-white px-7 py-4 rounded-2xl backdrop-blur-sm">
              Ver apartamento
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-left">
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Junto al mar</h2>
              <p className="text-slate-600">Ubicación ideal para disfrutar del paseo marítimo, la playa y el ambiente mediterráneo.</p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Reserva directa</h2>
              <p className="text-slate-600">Calendario de disponibilidad, pago seguro y confirmación de reserva.</p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Estancia cómoda</h2>
              <p className="text-slate-600">Apartamento pensado para escapadas, vacaciones, teletrabajo o estancias temporales.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="apartamento" className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-[2rem] bg-[#e8e1d6] aspect-[4/3] flex items-center justify-center text-slate-500">
            Aquí irá la foto principal del apartamento
          </div>

          <div>
            <p className="uppercase tracking-[0.3em] text-slate-500 mb-4">
              El apartamento
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">
              Una estancia tranquila en el paseo marítimo
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              Un espacio cómodo, luminoso y bien ubicado para disfrutar de El Campello, Alicante y el Mediterráneo.
            </p>
            <ul className="space-y-3 text-slate-700">
              <li>✓ Cerca de la playa</li>
              <li>✓ Buena conexión con Alicante</li>
              <li>✓ Ideal para vacaciones y estancias temporales</li>
              <li>✓ Licencia turística y NRA</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="galeria" className="px-6 py-24 bg-[#f7f4ee]">
        <div className="max-w-6xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-slate-500 mb-4">
            Galería
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold mb-10">
            Imágenes del apartamento
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {["IMG_9621.jpg", "IMG_9622.jpg", "IMG_9623.jpg"].map((img) => (
              <div key={img} className="rounded-[2rem] overflow-hidden shadow-sm aspect-[4/3] bg-white">
                <img
                  src={`/images/${img}`}
                  alt="Apartamento en El Campello"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ubicacion" className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-slate-500 mb-4">
              Ubicación
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">
              El Campello, paseo marítimo y Mediterráneo
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              Una ubicación ideal para disfrutar de la playa, restaurantes, paseos junto al mar y conexión con Alicante.
            </p>
            <ul className="space-y-3 text-slate-700">
              <li>✓ Paseo marítimo de El Campello</li>
              <li>✓ Playa y restaurantes cercanos</li>
              <li>✓ Conexión con Alicante mediante TRAM</li>
              <li>✓ Ideal para vacaciones o estancias temporales</li>
            </ul>
          </div>

          <div className="rounded-[2rem] bg-[#e8e1d6] aspect-[4/3] flex items-center justify-center text-slate-500">
            Aquí irá el mapa de ubicación
          </div>
        </div>
      </section>

      <section id="reservar" className="px-6 py-24 bg-[#f7f4ee]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-slate-500 mb-4">
            Reservas
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Consulta disponibilidad y reserva tu estancia
          </h2>
          <p className="text-lg text-slate-700 mb-10">
            Próximamente incorporaremos calendario sincronizado con Booking y Airbnb, pago seguro y tarjeta de garantía.
          </p>

          <div className="bg-white rounded-[2rem] p-8 shadow-sm">
            <div className="border border-dashed border-slate-300 rounded-2xl p-12 text-slate-500">
              Aquí irá el calendario de reservas
            </div>
          </div>
        </div>
      </section>
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-5 py-4 rounded-full shadow-xl font-medium"
      >
        WhatsApp
      </a>
    </main>
  );
}