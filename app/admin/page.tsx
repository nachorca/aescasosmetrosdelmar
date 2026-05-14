"use client";

import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [reservas, setReservas] = useState<any[]>([]);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [error, setError] = useState("");

  const [blockStart, setBlockStart] = useState("");
  const [blockEnd, setBlockEnd] = useState("");
  const [blockReason, setBlockReason] = useState("");

  async function cargarDatos() {
    setError("");

    const reservasRes = await fetch("/api/admin/reservas", {
      headers: { "x-admin-password": password },
    });

    const reservasData = await reservasRes.json();

    if (!reservasData.ok) {
      setError("Contraseña incorrecta");
      setIsAdmin(false);
      return;
    }

    const blocksRes = await fetch("/api/manual-blocks");
    const blocksData = await blocksRes.json();

    setReservas(reservasData.reservas || []);
    setBlocks(blocksData.blocks || []);
    setIsAdmin(true);
  }

  async function crearBloqueoManual() {
    const res = await fetch("/api/manual-blocks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({
        start_date: blockStart,
        end_date: blockEnd,
        reason: blockReason,
      }),
    });

    const data = await res.json();

    if (!data.ok) {
      setError(data.error || "Error creando bloqueo");
      return;
    }

    setBlockStart("");
    setBlockEnd("");
    setBlockReason("");
    await cargarDatos();
  }

  async function borrarBloqueo(id: string) {
    if (!confirm("¿Seguro que quieres borrar este bloqueo manual?")) return;

    const res = await fetch("/api/manual-blocks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (!data.ok) {
      setError(data.error || "Error borrando bloqueo");
      return;
    }

    await cargarDatos();
  }

  const unifiedRows = [
    ...reservas.map((r) => ({
      id: r.id,
      tipo: "Reserva Stripe",
      entrada: r.check_in,
      salida: r.check_out,
      huespedes: r.guests,
      pago: r.payment_status,
      estado: r.status,
      importe: r.amount_total ? `${r.amount_total / 100} €` : "-",
      email: r.customer_email || "-",
      stripe: r.stripe_session_id || "-",
      motivo: "-",
      manual: false,
    })),
    ...blocks.map((b) => ({
      id: b.id,
      tipo: "Reserva manual",
      entrada: b.start_date,
      salida: b.end_date,
      huespedes: "-",
      pago: "-",
      estado: "confirmed",
      importe: "-",
      email: "-",
      stripe: "-",
      motivo: b.reason || "Bloqueo manual",
      manual: true,
    })),
  ].sort((a, b) => String(a.entrada).localeCompare(String(b.entrada)));

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-[#f7f4ee] px-6 py-10">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 border border-slate-200">
          <h1 className="text-3xl font-semibold mb-2">Panel administración</h1>
          <p className="text-slate-600 mb-6">Acceso privado</p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 w-full mb-4"
            placeholder="Contraseña admin"
          />

          <button
            onClick={cargarDatos}
            className="rounded-xl bg-slate-900 text-white px-6 py-3 w-full"
          >
            Entrar
          </button>

          {error && <p className="text-red-600 mt-3">{error}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-semibold mb-2">Panel administración</h1>
        <p className="text-slate-600 mb-8">
          Reservas confirmadas y reservas manuales
        </p>

        <div className="rounded-2xl bg-white p-5 border border-slate-200 mb-8">
          <h2 className="text-xl font-semibold mb-4">Crear reserva manual</h2>

          <div className="grid md:grid-cols-4 gap-3">
            <input
              type="date"
              value={blockStart}
              onChange={(e) => setBlockStart(e.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              type="date"
              value={blockEnd}
              onChange={(e) => setBlockEnd(e.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              type="text"
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3"
              placeholder="Motivo / cliente / mantenimiento"
            />

            <button
              onClick={crearBloqueoManual}
              className="rounded-xl bg-slate-900 text-white px-6 py-3"
            >
              Crear reserva manual
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl bg-white border border-slate-200">
          <h2 className="text-xl font-semibold p-5">Reservas</h2>

          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-left">
              <tr>
                <th className="p-3">Tipo</th>
                <th className="p-3">Entrada</th>
                <th className="p-3">Salida</th>
                <th className="p-3">Huéspedes</th>
                <th className="p-3">Pago</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Importe</th>
                <th className="p-3">Email</th>
                <th className="p-3">Motivo</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {unifiedRows.map((r) => (
                <tr key={`${r.tipo}-${r.id}`} className="border-t border-slate-200">
                  <td className="p-3">{r.tipo}</td>
                  <td className="p-3">{r.entrada}</td>
                  <td className="p-3">{r.salida}</td>
                  <td className="p-3">{r.huespedes}</td>
                  <td className="p-3">{r.pago}</td>
                  <td className="p-3">{r.estado}</td>
                  <td className="p-3">{r.importe}</td>
                  <td className="p-3">{r.email}</td>
                  <td className="p-3">{r.motivo}</td>
                  <td className="p-3">
                    {r.manual ? (
                      <button
                        onClick={() => borrarBloqueo(r.id)}
                        className="rounded-lg bg-red-600 text-white px-4 py-2"
                      >
                        Borrar
                      </button>
                    ) : (
                      <span className="text-slate-400">Stripe</span>
                    )}
                  </td>
                </tr>
              ))}

              {!unifiedRows.length && (
                <tr>
                  <td className="p-6 text-slate-500" colSpan={10}>
                    No hay reservas todavía.
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
