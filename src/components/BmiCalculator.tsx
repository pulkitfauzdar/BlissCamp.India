"use client";

import { useState } from "react";

function verdict(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", note: "Build strength before the trek — talk to us about your fitness plan." };
  if (bmi < 25) return { label: "Healthy range", note: "You're in a good range for this trek. Keep up your cardio." };
  if (bmi < 30) return { label: "Overweight", note: "You can still trek — start the fitness plan early and add more cardio." };
  return { label: "Above recommended", note: "Please consult your doctor and call us before booking a high-altitude trek." };
}

export default function BmiCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const h = Number(height) / 100;
  const w = Number(weight);
  const bmi = h > 0 && w > 0 ? w / (h * h) : null;
  const result = bmi ? verdict(bmi) : null;

  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <p className="font-medium text-spruce">Check your BMI</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <label className="block text-xs font-medium uppercase tracking-wide text-ink/60">
          Height (cm)
          <input
            type="number"
            inputMode="decimal"
            min={100}
            max={230}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm normal-case tracking-normal text-ink"
            placeholder="170"
          />
        </label>
        <label className="block text-xs font-medium uppercase tracking-wide text-ink/60">
          Weight (kg)
          <input
            type="number"
            inputMode="decimal"
            min={25}
            max={200}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm normal-case tracking-normal text-ink"
            placeholder="65"
          />
        </label>
      </div>
      <div className="mt-4 min-h-[3.5rem] text-sm" aria-live="polite">
        {bmi && result ? (
          <>
            <p className="text-spruce">
              BMI <span className="font-display text-xl">{bmi.toFixed(1)}</span> · {result.label}
            </p>
            <p className="mt-1 text-ink/70">{result.note}</p>
          </>
        ) : (
          <p className="text-ink/50">Enter your height and weight.</p>
        )}
      </div>
    </div>
  );
}
