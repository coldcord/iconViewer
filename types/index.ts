/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import type { JSX, SVGProps } from "react";


export type IconProps = SVGProps<SVGSVGElement> & {
    size?: string; // "sm" | "md" | "lg" | "xl" | "xxl"
    width?: number | string;
    height?: number | string;
    color?: string;
    colorClass?: string;
};

export type Icon = (props: IconProps) => JSX.Element;
