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

import { Margins } from "@utils/margins";
import { classes } from "@utils/misc";
import { Clickable, Text, TooltipContainer } from "@webpack/common";

import { cssColors } from "./utils";


export function IconTooltip({ children, copy, className }: { children: string; copy: string; className?: string; }) {
    return <TooltipContainer text={"Click to copy"} className={className}>
        <Clickable onClick={() => {
            // @ts-ignore
            Clipboard.copy(copy);
        }}
            onContextMenu={() => {

            }}>{children}</Clickable>
    </TooltipContainer>;
}

export const ModalHeaderTitle = ({ iconName, color, name }: { iconName: string; color: number; name: string; }) => {
    return <Text variant="heading-lg/semibold"
        style={{ flexGrow: 1, display: "flex" }}
        className={classes("vc-ic-modal-header-title", `vc-ic-${name}-modal-header-title`)}>
        <IconTooltip copy={iconName} className={classes(Margins.right8, "vc-icon-modal-color-tooltip")}>
            {iconName}
        </IconTooltip>
        {" - "}
        <IconTooltip copy={cssColors[color]?.css} className={classes(Margins.left8, "vc-icon-modal-color-tooltip")}>
            {cssColors[color]?.name}
        </IconTooltip>
    </Text>;
};


