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
