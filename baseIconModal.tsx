/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { BaseText } from "@components/BaseText";
import { copyToClipboard } from "@utils/clipboard";
import { getIntlMessage } from "@utils/discord";
import { Margins } from "@utils/margins";
import { classes } from "@utils/misc";
import {
    ModalCloseButton,
    ModalHeader,
    ModalProps,
    ModalRoot,
} from "@utils/modal";
import { Clickable, ContextMenuApi, FluxDispatcher, Menu, showToast, Toasts, TooltipContainer, useState } from "@webpack/common";

import { ClickableProps, IconModalProps } from "./types";
import { colorKeys, cssColors } from "./utils";

export function IconTooltip({ children, copy, className, message, ...props }: ClickableProps & { children: string; copy: string; message?: string; }) {
    return <TooltipContainer text={"Click to copy"} className={className}>
        <Clickable onClick={() => {
            copyToClipboard(copy);
            showToast(message ?? "copied to clipboard successfully", Toasts.Type.SUCCESS);
        }} {...props}>{children}</Clickable>
    </TooltipContainer>;
}

function ColorContextMenu({ colorKeys }: { colorKeys: string[]; }) {
    const [query, setQuery] = useState("");
    const filtered = colorKeys.filter(k =>
        !query || k.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <Menu.Menu
            navId="vc-ic-colors-menu"
            onClose={() => FluxDispatcher.dispatch({ type: "CONTEXT_MENU_CLOSE" })}
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
                        autoFocus
                    />
                )}
            />
            <Menu.MenuSeparator />
            {filtered.map(colorKey => (
                <Menu.MenuItem
                    key={colorKey}
                    id={colorKey}
                    label={colorKey}
                    action={() => FluxDispatcher.dispatch({ type: "ICONVIEWER_COLOR_CHANGE", color: colorKey })}
                />
            ))}
        </Menu.Menu>
    );
}

export const ModalHeaderTitle = ({ iconName, color, name, onColor }: { iconName: string; color: number; name: string; onColor?: (color: string) => void; }) => {
    return <BaseText weight="semibold"
        style={{ flexGrow: 1, display: "flex" }}
        className={classes("vc-ic-modal-header-title", `vc-ic-${name}-modal-header-title`)}>
        <IconTooltip copy={iconName} className={classes(Margins.right8, "vc-icon-modal-color-tooltip")}>
            {iconName}
        </IconTooltip>
        {" - "}
        <IconTooltip copy={cssColors[color]?.css} className={classes(Margins.left8, "vc-icon-modal-color-tooltip")}
            onContextMenu={e=>ContextMenuApi.openContextMenu(e, () => <ColorContextMenu colorKeys={colorKeys} />)}>
            {cssColors[color]?.name}
        </IconTooltip>
    </BaseText>;
};

export function BaseIconModal({ children, iconName, color, Icon, onColor, name, ...props }: IconModalProps & ModalProps) {
    return (<ModalRoot {...props}>
        <ModalHeader>
            <ModalHeaderTitle iconName={iconName} color={color} name={name} onColor={onColor} />
            <ModalCloseButton onClick={props.onClose} />
        </ModalHeader>
        {children}
    </ModalRoot>);
}
