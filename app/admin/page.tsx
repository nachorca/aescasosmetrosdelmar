"use client";

import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [reservas, setReservas] = useState<any[]>([]);
  const [error, setError] = useState("");

  async function cargarReservas() {
    setError("");

    const res = await fetch("/api/admin/reservas", {
      headers: {
        "x-admin-password": password,
      },
    });

    const data = await res.json();

    if (!data.ok) {
      setError(data.error || "Error");
      return;
    }

    setReservas(data.reservas || []);
  }

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold mb-2">Panel administración</h1>
        <p className="text-slate-600 mb-8">
          Reservas reales de A escasos metros del mar
        </p>

        <div className="rounded-2xl bg-white p-5 border border-slate-200 mb-8">
          <label className="block text-sm text-slate-600 mb-2">
            Contraseña admin
          </label>

          <div className="flex gap-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3 w-full"
              placeholder="Introduce contraseña"
            />

            <button
              onClick={cargarReservas}
              className="rounded-xl bg-slate-900 text-white px-6 py-3"
            >
              Entrar
            </button>
          </div>

          {error && <p className="text-red-600 mt-3">{error}</p>}
        </div>

        <div className="overflow-x-auto rounded-2xl bg-white border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-left">
              <tr>
                <th className="p-3">Entrada</th>
                <th className="p-3">Salida</th>
                <th className="p-3">Huéspedes</th>
                <th className="p-3">Pago</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Importe</th>
                <th className="p-3">Email</th>
                <th className="p-3">Stripe</th>
              </tr>
            </thead>

            <tbody>
              {reservas.map((r) => (
                <tr key={r.id} className="border-t border-slate-200">
                  <td className="p-3">{r.check_in}</td>
                  <td className="p-3">{r.check_out}</td>
                  <td className="p-3">{r.guests}</td>
                  <td className="p-3">{r.payment_status}</td>
                  <td className="p-3">{r.status}</td>
                  <td className="p-3">
                    {r.amount_total ? `${r.amount_total / 100} €` : "-"}
                  </td>
                  <td className="p-3">{r.customer_email || "-"}</td>
                  <td className="p-3 text-xs">{r.stripe_session_id}</td>
                </tr>
              ))}

              {!reservas.length && (
                <tr>
                  <td className="p-6 text-slate-500" colSpan={8}>
                    No hay reservas cargadas todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
