import type { ItineraryDay } from "@/types";

export default function ElevationProfile({ itinerary }: { itinerary: ItineraryDay[] }) {
  const width = 640;
  const height = 160;
  const padding = { top: 16, right: 16, bottom: 28, left: 44 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const elevations = itinerary.map((d) => d.elevationM);
  const min = Math.min(...elevations);
  const max = Math.max(...elevations);
  const range = max - min || 1;

  const points = itinerary.map((d, i) => {
    const x = padding.left + (i / (itinerary.length - 1)) * plotWidth;
    const y = padding.top + plotHeight - ((d.elevationM - min) / range) * plotHeight;
    return { x, y, day: d.day, elevationM: d.elevationM };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    padding.top + plotHeight
  } L ${points[0].x} ${padding.top + plotHeight} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label="Elevation profile across the trek, by day"
    >
      <path d={areaPath} fill="#6E93A0" opacity={0.12} />
      <path d={linePath} fill="none" stroke="#4E7784" strokeWidth={2} />
      {points.map((p) => (
        <g key={p.day}>
          <circle cx={p.x} cy={p.y} r={3.5} fill="#1B2E28" />
          <text
            x={p.x}
            y={height - 8}
            textAnchor="middle"
            className="fill-ink/60"
            fontSize={11}
          >
            D{p.day}
          </text>
          <text
            x={p.x}
            y={p.y - 10}
            textAnchor="middle"
            className="fill-spruce"
            fontSize={11}
            fontWeight={500}
          >
            {p.elevationM.toLocaleString("en-IN")}m
          </text>
        </g>
      ))}
    </svg>
  );
}
