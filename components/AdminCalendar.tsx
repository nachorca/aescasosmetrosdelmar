"use client";

import { useState } from "react";

type Reservation = {
  id: string;
  tipo: string;
  entrada: string;
  salida: string;
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
}: {
  reservations: Reservation[];
}) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthName = currentMonth.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  function prevMonth() {
    setCurrentMonth(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setCurrentMonth(new Date(year, month + 1, 1));
  }

  function getReservation(dateKey: string) {
    return reservations.find((r) => overlaps(dateKey, r.entrada, r.salida));
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
          <div key={`empty-${i}`} className="min-h-[90px]" />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const dateKey = toDateKey(new Date(year, month, day));
          const reservation = getReservation(dateKey);

          return (
            <div
              key={dateKey}
              className={`rounded-2xl p-3 min-h-[95px] border ${
                reservation
                  ? `${getColor(reservation.tipo)} border-transparent`
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="font-semibold mb-2">{day}</div>

              {reservation ? (
                <div className="text-xs">
                  <div className="font-medium">{reservation.tipo}</div>
                  <div className="opacity-90 mt-1">
                    {reservation.entrada} → {reservation.salida}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-400">Disponible</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
