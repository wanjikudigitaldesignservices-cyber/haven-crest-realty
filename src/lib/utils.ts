import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "KES"): string {
  if (amount >= 1000000) {
    const millions = amount / 1000000;
    // e.g. KES 285M or KES 2.5M
    const formatted = millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1);
    return `${currency} ${formatted}M`;
  }
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: currency === "KES" ? "KES" : "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyFull(amount: number, currency: string = "KES"): string {
  return `${currency} ${amount.toLocaleString('en-KE')}`;
}

export function formatSqm(sqm: number | null | undefined): string {
  if (!sqm) return "N/A";
  const sqft = Math.round(sqm * 10.7639);
  return `${sqm.toLocaleString()} sqm (${sqft.toLocaleString()} sqft)`;
}

export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
