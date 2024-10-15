import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

let LZMA;

async function initLZMA() {
  if (typeof window !== "undefined" && !LZMA) {
    LZMA = await import("lzma/src/lzma_worker.js").then((mod) => mod.default);
  }
}

export async function compressData(data) {
  await initLZMA();
  return new Promise((resolve, reject) => {
    LZMA.compress(data, 9, (result, error) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

export async function decompressData(compressedData) {
  await initLZMA();
  return new Promise((resolve, reject) => {
    LZMA.decompress(compressedData, (result, error) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}
