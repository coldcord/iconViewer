/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

//            <Text variant="heading-lg/semibold" style={{ flexGrow: 1, display: "flex" }}>
//                <IconNameTooltip iconName={iconName} />
//                -
//                <IconColorTooltip color={color} />
//            </Text>

import { getIntlMessage } from "@utils/discord";
import { Margins } from "@utils/margins";
import { classes } from "@utils/misc";
import { Clickable, ContextMenuApi, FluxDispatcher, Menu, Text, TooltipContainer, useState } from "@webpack/common";
import type { ComponentPropsWithRef, PropsWithChildren } from "react";

import { cssColors } from "./utils";



export type ClickableProps<T extends "a" | "div" | "span" | "li" = "div"> = PropsWithChildren<ComponentPropsWithRef<T>> & {
    tag?: T;
};

export function IconTooltip({ children, copy, className, ...props }: ClickableProps & { children: string; copy: string; }) {
    return <TooltipContainer text={"Click to copy"} className={className}>
        <Clickable onClick={() => {
            // @ts-ignore
            Clipboard.copy(copy);
        }} {...props}>{children}</Clickable>
    </TooltipContainer>;
}

export const ModalHeaderTitle = ({ iconName, color, name }: { iconName: string; color: number; name: string; }) => {
    const [query, setQuery] = useState("");
    return <Text variant="heading-lg/semibold"
        style={{ flexGrow: 1, display: "flex" }}
        className={classes("vc-ic-modal-header-title", `vc-ic-${name}-modal-header-title`)}>
        <IconTooltip copy={iconName} className={classes(Margins.right8, "vc-icon-modal-color-tooltip")}>
            {iconName}
        </IconTooltip>
        {" - "}
        <IconTooltip copy={cssColors[color]?.css} className={classes(Margins.left8, "vc-icon-modal-color-tooltip")}
            onContextMenu={e => {
                ContextMenuApi.openContextMenu(e, () => (
                    <Menu.Menu
                        navId="vc-pindms-header-menu"
                        onClose={() => FluxDispatcher.dispatch({ type: "CONTEXT_MENU_CLOSE" })}
                        color="danger"
                        aria-label="Icon Viewer Colors"
                    >
                        <Menu.MenuControlItem
                            id="vc-ic-colors-search"
                            control={(props, ref) => (
                                <Menu.MenuSearchControl
                                    {...props}
                                    query={query}
                                    onChange={setQuery}
                                    ref={ref}
                                    placeholder={getIntlMessage("SEARCH")}
                                />
                            )}
                        />

                    </Menu.Menu>
                ));
            }}>
            {cssColors[color]?.name}
        </IconTooltip>
    </Text >;
};

// {cssColors[color]?.name}

