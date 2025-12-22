/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "@utils/Logger";
import { saveFile } from "@utils/web";
import { filters, findAll, findByPropsLazy, waitFor } from "@webpack";
import { createRoot, ReactDOM } from "@webpack/common";

import { getNameByIcon, namePatterns } from "./names";
import { CssColorData, Icon } from "./types";

let cachedIcons: IconsDef | null = null;
export let colorKeys: string[] = [];
export type IconsDef = { [k: string]: Icon; };

export const iconSizesInPx = findByPropsLazy("sm", "md", "lg", "xxs", "xs");
export const Colors = findByPropsLazy("colors", "layout");

export const logger = new Logger("IconViewer");


export const cssColors = new Proxy({} as Record<number, CssColorData>, {
    get: (target, key) => {
        const idx = Number(key);
        if (isNaN(idx)) return undefined;

        if (target[idx]) return target[idx];

        const colorKey = colorKeys[idx];
        if (!colorKey || !Colors.colors[colorKey]?.css) return undefined;

        const name = colorKey.split("_").map(x => x[0].toUpperCase() + x.toLowerCase().slice(1)).join(" ");
        target[idx] = { name, css: Colors.colors[colorKey].css, key: colorKey };
        return target[idx];
    }
});

export function getColorIndex(colorKey: string): number {
    return colorKeys.indexOf(colorKey);
}

export const iconSizes = ["xxs", "xs", "sm", "md", "lg"];

export const FORMAT_EXTENSIONS: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/svg+xml": "svg",
    "image/avif": "avif"
};


export function saveIcon(iconName: string, icon: Element | string, color: number, size: number, type: string) {
    const colorName = cssColors[color]?.name ?? "unknown";
    const ext = FORMAT_EXTENSIONS[type] ?? "png";
    const filename = `${iconName}-${colorName}-${size}px.${ext}`;

    if (typeof icon === "string") {
        saveFile(new File([icon], filename, { type: "text/plain" }));
        return;
    }

    for (const el of icon.children) {
        const fill = el.getAttribute("fill");
        if (fill?.startsWith("var(")) {
            el.setAttribute("fill", getComputedStyle(icon).getPropertyValue(fill.slice(4, -1)));
        }
    }

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
        ctx.drawImage(img, 0, 0, size, size);
        const link = document.createElement("a");
        link.download = filename;
        link.href = canvas.toDataURL(type);
        link.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(icon.outerHTML)}`;
}


export function convertToHtml(component: React.ReactElement): string {
    const container = document.createElement("div");
    const root = createRoot(container);
    ReactDOM.flushSync(() => root.render(component));
    const content = container.innerHTML;
    root.unmount();
    return content;
}


export const findAllByCode = (code: string) => findAll(filters.byCode(code));



export function findAllIcons() {
    return findAll(m => {
        if (typeof m !== "function") return false;
        const str = m.toString?.() ?? "";
        if (str.includes("direction:")) return false;
        if (str.includes('viewBox:"0 0 272 143"')) return false;
        return str.includes("viewBox:") && str.includes("color:") && (str.includes("foreground:") || str.includes("colorClass:"));
    });
}

export function getIcons(): IconsDef {
    if (cachedIcons) return cachedIcons;

    const allIcons = Array.from(new Set(findAllIcons()));
    cachedIcons = Object.fromEntries(
        allIcons.map((icon, idx) => [getNameByIcon(icon, String(idx)), icon])
    );
    logger.debug("left patterns:", namePatterns);
    return cachedIcons as IconsDef;
}

waitFor(["colors", "layout"], m => {
    colorKeys = Object.keys(m.colors);
});

