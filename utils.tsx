/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { saveFile } from "@utils/web";
import { filters, findAll, findByPropsLazy, waitFor } from "@webpack";
import { createRoot, ReactDOM } from "@webpack/common";

import * as t from "./types";

export let colorKeys: string[] = [];
export type IconsDef = { [k: string]: t.Icon; };

export const iconSizesInPx = findByPropsLazy("sm", "md", "lg", "xxs", "xs");
export const Colors = findByPropsLazy("colors", "layout");



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

const CrosspendingTypes: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/gif": "gif",
    "image/bmp": "bmp",
    "image/tiff": "tiff",
    "image/webp": "webp",
    "image/svg+xml": "svg",
    "image/avif": "avif"
};

export function saveIcon(iconName: string, icon: EventTarget & SVGSVGElement | Element | string, color: number, size: number, type: string = "image/png") {
    const filename = `${iconName}-${cssColors[color]?.name ?? "unknown"}-${size}px.${CrosspendingTypes[type] ?? "png"}`;
    if (typeof icon === "string") {
        const file = new File([icon], filename, { type: "text/plain" });
        saveFile(file);
        return;
    }

    const innerElements = icon.children;
    for (const el of innerElements) {
        const fill = el.getAttribute("fill");
        if (fill && fill.startsWith("var(")) {
            el.setAttribute("fill", getComputedStyle(icon).getPropertyValue(fill.replace("var(", "").replace(")", "")));
        }
    }

    // save svg as the given type
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


export function convertComponentToHtml(component?: React.ReactElement): string {
    const container = document.createElement("div");
    const root = createRoot(container);

    ReactDOM.flushSync(() => root.render(component));
    const content = container.innerHTML;
    root.unmount();

    return content;
}

export const findAllByCode = (code: string) => findAll(filters.byCode(code));

waitFor(["colors", "layout"], m => {
    colorKeys = Object.keys(m.colors);
});

