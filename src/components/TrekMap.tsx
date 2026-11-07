"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";

export type MapTrek = {
  slug: string;
  title: string;
  state: string;
  lat: number;
  lng: number;
  durationDays: number;
  difficulty: string;
  maxAltitudeM: number;
  price: string;
  image: string;
};

// Railheads / towns where our pickups start.
const pickups = [
  { name: "Dehradun", lat: 30.3165, lng: 78.0322 },
  { name: "Rishikesh", lat: 30.0869, lng: 78.2676 },
  { name: "Kathgodam", lat: 29.2194, lng: 79.5126 },
  { name: "Manali", lat: 32.2432, lng: 77.1892 },
];

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export default function TrekMap({
  treks,
  focusState = "Uttarakhand",
}: {
  treks: MapTrek[];
  focusState?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    // Leaflet touches `window`, so load it only in the browser.
    import("leaflet").then(({ default: L }) => {
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, { scrollWheelZoom: false });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        maxZoom: 15,
        subdomains: "abc",
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM · Style © <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
      }).addTo(map);

      for (const p of pickups) {
        L.circleMarker([p.lat, p.lng], {
          radius: 5,
          color: "#fff",
          weight: 2,
          fillColor: "#4E7784",
          fillOpacity: 1,
        })
          .bindTooltip(`${p.name} · pickup`, { permanent: true, direction: "right", className: "pickup-label", offset: [6, 0] })
          .addTo(map);
      }

      for (const t of treks) {
        const icon = L.divIcon({
          className: "",
          html: '<div class="trek-pin"><span>▲</span></div>',
          iconSize: [30, 30],
          iconAnchor: [15, 36],
          popupAnchor: [0, -34],
          tooltipAnchor: [0, -30],
        });
        const popup = `
          <div class="trek-popup">
            <img src="${escapeHtml(t.image)}" alt="" />
            <p class="trek-popup-title">${escapeHtml(t.title)}</p>
            <p class="trek-popup-meta">${t.durationDays} days · ${escapeHtml(t.difficulty)} · ${t.maxAltitudeM.toLocaleString("en-IN")} m</p>
            <p class="trek-popup-price">${escapeHtml(t.price)} <span>/ person</span></p>
            <a href="/treks/${encodeURIComponent(t.slug)}">View trek →</a>
          </div>`;
        const marker = L.marker([t.lat, t.lng], { icon, title: t.title })
          .bindPopup(popup, { minWidth: 220, maxWidth: 240 })
          .bindTooltip(escapeHtml(t.title), { permanent: true, direction: "top", className: "trek-label" })
          .on("popupopen", () => setActive(t.slug))
          .on("popupclose", () => setActive((a) => (a === t.slug ? null : a)))
          .addTo(map);
        markersRef.current[t.slug] = marker;
      }

      const focus = treks.filter((t) => t.state === focusState);
      const points = (focus.length ? focus : treks).map((t) => [t.lat, t.lng] as [number, number]);
      if (points.length) map.fitBounds(points, { padding: [50, 50], maxZoom: 9 });
      else map.setView([30.3, 79], 7);
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, [treks, focusState]);

  const flyTo = (t: MapTrek) => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo([t.lat, t.lng], 10, { duration: 1 });
    map.once("moveend", () => markersRef.current[t.slug]?.openPopup());
  };

  const states = Array.from(new Set(treks.map((t) => t.state)));

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div className="relative isolate overflow-hidden rounded-2xl border border-line bg-stone-fog">
        <div
          ref={containerRef}
          className="h-[420px] w-full sm:h-[520px]"
          role="region"
          aria-label="Map of our trek locations"
        />
      </div>

      <div className="rounded-2xl border border-line bg-white p-4 lg:max-h-[520px] lg:overflow-y-auto">
        {states.map((state) => (
          <div key={state} className="mb-4 last:mb-0">
            <p className="px-2 text-xs font-medium uppercase tracking-wide text-ink/50">{state}</p>
            <ul className="mt-1">
              {treks
                .filter((t) => t.state === state)
                .map((t) => (
                  <li key={t.slug}>
                    <button
                      type="button"
                      onClick={() => flyTo(t)}
                      className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors ${
                        active === t.slug ? "bg-spruce text-stone-paper" : "hover:bg-stone-fog"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] ${
                          active === t.slug ? "bg-amber text-spruce-dark" : "bg-spruce text-amber"
                        }`}
                      >
                        ▲
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{t.title}</span>
                        <span className={`block text-xs ${active === t.slug ? "text-stone-fog/80" : "text-ink/60"}`}>
                          {t.durationDays} days · {t.difficulty}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
        <p className="mt-2 flex items-center gap-2 border-t border-line px-2 pt-3 text-xs text-ink/60">
          <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-white bg-glacier-dark ring-1 ring-glacier-dark" />
          Pickup town
        </p>
      </div>
    </div>
  );
}
