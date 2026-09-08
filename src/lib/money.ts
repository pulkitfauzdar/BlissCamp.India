const currency = (process.env.NEXT_PUBLIC_CURRENCY || "inr").toUpperCase();

// All prices are stored as integer paise (smallest currency unit) to avoid
// floating point rounding errors. This formats them back to a display string.
export function formatMoney(paise: number): string {
  const amount = paise / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
