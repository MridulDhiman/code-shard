import clsx from "clsx";

import { twMerge } from "tailwind-merge";

// nice
export default function cn (...inputs) {
    return twMerge(clsx(inputs));
}


export const writeToClipboard = (text) => {
navigator.clipboard.writeText(`${text}`);
}

export const FOLLOWED = "followed";
export const NOT_FOLLOWED = "not followed";
export const templates = ["static", "angular", "react", "react-ts", "solid", "svelte", "test-ts", "vanilla-ts", "vanilla", "vue", "vue-ts", "node", "nextjs" ,"astro", "vite", "vite-react", "vite-react-ts"];
