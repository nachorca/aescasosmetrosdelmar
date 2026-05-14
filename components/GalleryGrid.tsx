"use client";

import { useState } from "react";

const images = [
  "portada.jpg",
  "PORTADA 2.jpg",
  "IMG_9621.jpg",
  "IMG_9622.jpg",
  "IMG_9623.jpg",
  "IMG_9624.jpg",
  "IMG_9625.jpg",
  "IMG_9626.jpg",
  "IMG_9627.jpg",
  "IMG_9628.jpg",
  "PHOTO-2024-06-17-21-07-17 3.jpg",
  "PHOTO-2024-06-17-21-07-17 4.jpg",
  "WhatsApp Image 2024-08-25 at 16.29.30.jpeg",
  "WhatsApp Image 2024-08-25 at 16.29.31.jpeg",
];

export default function GalleryGrid() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-4 gap-5">
        {images.map((img, index) => (
          <button
            key={img}
            type="button"
            onClick={() => setSelected(img)}
            className={`rounded-[2rem] overflow-hidden shadow-sm bg-white ${
              index === 0 ? "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto" : "aspect-[4/3]"
            }`}
          >
            <img
              src={`/images/${img}`}
              alt="Apartamento en El Campello"
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-6">
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="absolute top-6 right-6 rounded-full bg-white text-slate-900 px-4 py-2 font-medium"
          >
            Cerrar
          </button>

          <img
            src={`/images/${selected}`}
            alt="Apartamento ampliado"
            className="max-w-full max-h-[85vh] rounded-3xl object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
