import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import { propertyConfig } from "@/lib/property";
import HeroCarousel from "@/components/HeroCarousel";
import GalleryGrid from "@/components/GalleryGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-slate-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/25 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">
          <a href="#" className="font-semibold tracking-wide">
            {propertyConfig.name}
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/85">
            <a href="#apartamento" className="hover:text-white">Apartamento</a>
            <a href="#servicios" className="hover:text-white">Servicios</a>
            <a href="#ubicacion" className="hover:text-white">Ubicación</a>
            <a href="#galeria" className="hover:text-white">Galería</a>
            <a href="#reservar" className="hover:text-white">Reservar</a>
            <a href="/admin" className="hover:text-white">Admin</a>
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
        <HeroCarousel />

        <div className="relative z-10 max-w-5xl text-center text-white">
          <p className="uppercase tracking-[0.35em] text-white/80 mb-6">
            {propertyConfig.city} · {propertyConfig.province}
          </p>

          <h1 className="text-5xl md:text-8xl font-semibold mb-6">
            {propertyConfig.name}
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-10">
            Apartamento turístico junto al paseo marítimo de {propertyConfig.city}.
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

      <section className="px-6 py-16 bg-[#f7f4ee]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-4">
          {[
            ["Playa", "{propertyConfig.name}"],
            ["Ubicación", "Paseo marítimo de {propertyConfig.city}"],
            ["Conexión", "TRAM y {propertyConfig.province} cerca"],
            ["Reserva", "Pago seguro y disponibilidad"]
          ].map(([title, text]) => (
            <div key={title} className="bg-white rounded-3xl p-6 shadow-sm text-center">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400 mb-2">{title}</p>
              <p className="font-medium text-slate-800">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="servicios" className="px-6 py-24 bg-[#f7f4ee]">
        <div className="max-w-6xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-slate-500 mb-4">
            Servicios
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold mb-10">
            Servicios del apartamento
          </h2>

          <GalleryGrid />
        </div>
      </section>

      <section id="ubicacion" className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-slate-500 mb-4">
              Ubicación
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">
              {propertyConfig.city}, paseo marítimo y Mediterráneo
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              El apartamento se encuentra en {propertyConfig.city}, una de las zonas costeras más agradables de {propertyConfig.province}, ideal para disfrutar del mar Mediterráneo, el paseo marítimo, restaurantes, playa y estancias tranquilas junto al mar.
            </p>
            <ul className="space-y-3 text-slate-700">
              <li>✓ Paseo marítimo de {propertyConfig.city}</li>
              <li>✓ Playa y restaurantes cercanos</li>
              <li>✓ Conexión con {propertyConfig.province} mediante TRAM</li>
              <li>✓ Ideal para vacaciones o estancias temporales</li>
            </ul>
          </div>

          <div className="rounded-[2rem] overflow-hidden shadow-xl aspect-[4/3]">
            <iframe
              src="https://www.google.com/maps?q=El%20Campello%20{propertyConfig.province}%20paseo%20maritimo&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación aproximada en {propertyConfig.city}"
            ></iframe>
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
            <AvailabilityCalendar />

            <div className="grid md:grid-cols-3 gap-4 text-left">
              <div className="rounded-2xl bg-[#f7f4ee] p-5">
                <h3 className="font-semibold mb-2">Pago seguro</h3>
                <p className="text-sm text-slate-600">Reserva directa con pasarela segura.</p>
              </div>
              <div className="rounded-2xl bg-[#f7f4ee] p-5">
                <h3 className="font-semibold mb-2">Tarjeta de garantía</h3>
                <p className="text-sm text-slate-600">Sin guardar números de tarjeta manualmente.</p>
              </div>
              <div className="rounded-2xl bg-[#f7f4ee] p-5">
                <h3 className="font-semibold mb-2">Calendario sincronizado</h3>
                <p className="text-sm text-slate-600">Preparado para Booking y Airbnb.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <a
        href="https://wa.me/34665691462?text=Hola%2C%20quiero%20consultar%20disponibilidad%20del%20apartamento%20A%20escasos%20metros%20del%20mar"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-5 py-4 rounded-full shadow-xl font-medium"
      >
        WhatsApp
      </a>
    </main>
  );
}