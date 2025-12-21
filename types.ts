/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ModalSize } from "@utils/modal";
import type { ComponentPropsWithRef, JSX, PropsWithChildren, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
    size?: string; // "sm" | "md" | "lg" | "xl" | "xxl"
    width?: number | string;
    height?: number | string;
    color?: string;
    colorClass?: string;
};

export type Icon = (props: IconProps) => JSX.Element;


export interface IconModalProps {
    children: any[];
    iconName: string;
    color: number;
    Icon?: Icon;
    onColor?: (color: string) => void;
    name: string;
    className?: string;
    size?: ModalSize;
}

export interface CssColorData {
    name: string;
    css: string;
    key: string;
}

export type ClickableProps<T extends "a" | "div" | "span" | "li" = "div"> = PropsWithChildren<ComponentPropsWithRef<T>> & {
    tag?: T;
};
