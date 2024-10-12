/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { findByPropsLazy, waitFor } from "@webpack";
import { Icons as OrgIcons, React } from "@webpack/common";
import * as t from "@webpack/types";

export const Colors = findByPropsLazy("colors", "layout");
export const iconSizesInPx = findByPropsLazy("md", "lg");
export const cssColors = new Proxy(
    {},
    {
        get: (target, key) => {
            if (Number(key) < 0)
                key = String(Object.keys(Colors.colors).length + Number(key));
            const colorKey = Object.keys(Colors.colors)[key];
            return key in target
                ? target[key]
                : Colors.colors[colorKey]?.css != null ? (target[key] = { name: colorKey.split("_").map((x: string) => x[0].toUpperCase() + x.toLowerCase().slice(1)).join(" "), css: Colors.colors[colorKey].css, key: colorKey }) : undefined;
        }
    }
) as unknown as Array<{ name: string; css: string; key: string; }>;

export const iconSizes = ["xxs", "xs", "sm", "md", "lg"];

export function saveIcon(iconName: string, icon: EventTarget & SVGSVGElement, color: number, size: number) {
    // iterate over children of svg, if they have fill, resolve the var
    const innerElements = icon.children;
    for (const el of innerElements) {
        const fill = el.getAttribute("fill");
        if (fill && fill.startsWith("var(")) {
            el.setAttribute("fill", getComputedStyle(icon).getPropertyValue(fill.replace("var(", "").replace(")", "")));
        }
    }

    // save svg as png
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();

    img.onload = () => {
        ctx.drawImage(img, 0, 0, size, size);
        const link = document.createElement("a");
        link.download = `${iconName}-${cssColors[color]?.name ?? "unknown"}-${size}px.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(icon.outerHTML)}`;
}

export function ConvertComponentToHtml(component?: null | boolean | string | t.Icon) {
    if (!component) return "";
    if (typeof component === "string") return component;
    if (Array.isArray(component)) return component.map(ConvertComponentToHtml).join("");
    if (!React.isValidElement(component)) throw new Error("Invalid component");
    const props = component.props as any;
    const propsStr = Object.keys(props).map(key => {
        if (key === "children") return "";
        if (key === "className") return `class="${props[key]}"`;
        return `${key}="${props[key]}"`;
    }).join(" ");
    return `<${component.type} ${propsStr}>${ConvertComponentToHtml(props.children)}</${component.type}>`;
}

export let Icons = {} as t.Icons;

waitFor(["FormItem", "Button"], m => {
    Icons = Object.fromEntries(Object.keys(OrgIcons).filter(k => k.endsWith("Icon")).map(k => [k, OrgIcons[k]])) as t.Icons;
});
