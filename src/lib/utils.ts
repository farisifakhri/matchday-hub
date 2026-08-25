import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMatchTime(minute: number, second: number): string {
  const minStr = String(minute).padStart(2, "0");
  const secStr = String(second).padStart(2, "0");
  return `${minStr}:${secStr}`;
}
