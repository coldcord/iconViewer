/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { BaseText } from "@components/BaseText";
import { copyWithToast } from "@utils/discord";
import { Margins } from "@utils/margins";
import { classes } from "@utils/misc";
import {
    ModalHeader,
    ModalProps,
    ModalRoot,
} from "@utils/modal";
import { findComponentByCodeLazy } from "@webpack";
import { Clickable, ContextMenuApi, TooltipContainer } from "@webpack/common";

import { ColorContextMenu } from "./colorContextMenu";
import { ClickableProps, IconModalProps } from "./types";
import { colorKeys, cssColors } from "./utils";

const CloseButton = findComponentByCodeLazy("CLOSE_BUTTON_LABEL");


export function IconTooltip({ children, copy, className, message, ...props }: ClickableProps & { children: string; copy: string; message?: string; }) {
    return <TooltipContainer text={"Click to copy"} className={className}>
        <Clickable onClick={() => {
            copyWithToast(copy, message ?? "copied to clipboard successfully");
        }} {...props}>{children}</Clickable>
    </TooltipContainer>;
}

export const ModalHeaderTitle = ({ iconName, currentColor, name, onColor }: { iconName: string; currentColor: number; name: string; onColor?: (color: string) => void; }) => {
    return <BaseText weight="semibold" size="lg"
        style={{ flexGrow: 1, display: "flex" }}
        className={classes("vc-ic-modal-header-title", `vc-ic-${name}-modal-header-title`)}>
        <IconTooltip copy={iconName} className={classes(Margins.right8, "vc-icon-modal-color-tooltip")}>
            {iconName}
        </IconTooltip>
        {" - "}
        <IconTooltip copy={cssColors[currentColor]?.css} className={classes(Margins.left8, "vc-icon-modal-color-tooltip")}
            onContextMenu={e => ContextMenuApi.openContextMenu(e, () => <ColorContextMenu colorKeys={colorKeys} onColor={onColor} />)}>
            {cssColors[currentColor]?.name}
        </IconTooltip>
    </BaseText>;
};

export function BaseIconModal({ children, iconName, currentColor, Icon, onColor, name, ...props }: IconModalProps & ModalProps) {
    return (<ModalRoot {...props}>
        <ModalHeader>
            <ModalHeaderTitle iconName={iconName} currentColor={currentColor} name={name} onColor={onColor} />
            <CloseButton onClick={props.onClose} />
        </ModalHeader>
        {children}
    </ModalRoot>);
}
