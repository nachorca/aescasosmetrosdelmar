"use client";

import { useEffect, useState } from "react";

type Reservation = {
  id: string;
  tipo: string;
  entrada: string;
  salida: string;
};

type DailyPrice = {
  date: string;
  price: number;
};

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function overlaps(date: string, start: string, end: string) {
  return date >= start && date < end;
}

function getColor(tipo: string) {
  if (tipo.includes("Airbnb")) return "bg-pink-500 text-white";
  if (tipo.includes("Booking")) return "bg-blue-500 text-white";
  if (tipo.includes("manual")) return "bg-amber-500 text-white";
  return "bg-emerald-600 text-white";
}

export default function AdminCalendar({
  reservations,
  adminPassword,
}: {
  reservations: Reservation[];
  adminPassword: string;
}) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [savingDate, setSavingDate] = useState("");

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthName = currentMonth.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  useEffect(() => {
    fetch("/api/prices")
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) return;

        const map: Record<string, number> = {};
        (data.prices || []).forEach((p: DailyPrice) => {
          map[p.date] = p.price;
        });

        setPrices(map);
      });
  }, []);

  function prevMonth() {
    setCurrentMonth(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setCurrentMonth(new Date(year, month + 1, 1));
  }

  function getReservation(dateKey: string) {
    return reservations.find((r) => overlaps(dateKey, r.entrada, r.salida));
  }

  async function savePrice(date: string, price: number) {
    setSavingDate(date);

    const res = await fetch("/api/prices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": adminPassword,
      },
      body: JSON.stringify({
        date,
        price,
      }),
    });

    const data = await res.json();

    if (data.ok) {
      setPrices((prev) => ({
        ...prev,
        [date]: price,
      }));
    } else {
      alert(data.error || "No se pudo guardar el precio");
    }

    setSavingDate("");
  }

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={prevMonth}
          className="rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-100"
        >
          ←
        </button>

        <h3 className="text-xl font-semibold capitalize">{monthName}</h3>

        <button
          type="button"
          onClick={nextMonth}
          className="rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-100"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-sm text-center mb-3 text-slate-500">
        {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 text-sm">
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[120px]" />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const dateKey = toDateKey(new Date(year, month, day));
          const reservation = getReservation(dateKey);
          const price = prices[dateKey] ?? 130;

          return (
            <div
              key={dateKey}
              className={`rounded-2xl p-3 min-h-[125px] border ${
                reservation
                  ? `${getColor(reservation.tipo)} border-transparent`
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="font-semibold mb-2">{day}</div>

              {reservation ? (
                <div className="text-xs mb-2">
                  <div className="font-medium">{reservation.tipo}</div>
                  <div className="opacity-90 mt-1">
                    {reservation.entrada} → {reservation.salida}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-400 mb-2">Disponible</div>
              )}

              <div className="mt-2">
                <label className="block text-[11px] mb-1 opacity-80">
                  Precio noche
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) =>
                    setPrices((prev) => ({
                      ...prev,
                      [dateKey]: Number(e.target.value),
                    }))
                  }
                  onBlur={(e) => savePrice(dateKey, Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300 px-2 py-1 text-slate-900"
                />
                {savingDate === dateKey && (
                  <p className="text-[11px] mt-1">Guardando...</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
