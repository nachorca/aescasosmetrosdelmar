
export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-slate-900">
      <section className="h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <p className="uppercase tracking-[0.3em] text-slate-500 mb-4">
            El Campello · Alicante
          </p>

          <h1 className="text-5xl md:text-7xl font-semibold mb-6">
            A escasos metros del mar
          </h1>

          <p className="text-xl text-slate-700 mb-8">
            Apartamento turístico junto al paseo marítimo de El Campello.
          </p>

          <div className="flex gap-4 justify-center">
            <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl">
              Reservar
            </button>

            <button className="border border-slate-400 px-6 py-3 rounded-2xl">
              Ver apartamento
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}