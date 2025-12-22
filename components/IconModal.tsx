/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { BaseText } from "@components/BaseText";
import { Button } from "@components/Button";
import { CodeBlock } from "@components/CodeBlock";
import { copyWithToast } from "@utils/discord";
import { Margins } from "@utils/margins";
import { classes } from "@utils/misc";
import {
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalProps,
    ModalRoot,
    ModalSize,
    openModal
} from "@utils/modal";
import { DefinedSettings } from "@utils/types";
import { findComponentByCodeLazy } from "@webpack";
import { Clickable, ContextMenuApi, TooltipContainer, useCallback, useEffect, useState } from "@webpack/common";

import { ActionsContextMenu } from "./contextMenus/actionsContextMenu";
import { ColorContextMenu } from "./contextMenus/colorContextMenu";
import * as t from "./types";
import { colorKeys, cssColors, getColorIndex, iconSizes } from "./utils";


const CloseButton = findComponentByCodeLazy("CLOSE_BUTTON_LABEL");

export function IconTooltip({ children, copy, className, message, ...props }: t.ClickableProps & { children: string; copy: string; message?: string; }) {
    return <TooltipContainer text={"Click to copy"} className={className}>
        <Clickable onClick={() => {
            copyWithToast(copy, message ?? "copied to clipboard successfully");
        }} {...props}>{children}</Clickable>
    </TooltipContainer>;
}

export const ModalHeaderTitle = ({ iconName, currentColor, onColor }: { iconName: string; currentColor: number; onColor?: (color: string) => void; }) => {
    return <BaseText weight="semibold" size="lg"
        style={{ flexGrow: 1, display: "flex" }}
        className={classes("vc-ic-modal-header-title", "vc-ic-modal-header-title")}>
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

function useColorNavigation(initialColor: number) {
    const [color, setColor] = useState(initialColor);

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            const { length } = colorKeys;
            const direction = event.key === "ArrowLeft" ? -1 : 1;
            setColor(prev => (prev + direction + length) % length);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [onKeyDown]);

    return [color, setColor] as const;
}

function ModalComponent({ iconName, Icon, findPattern, settings, ...props }: { iconName: string; Icon: t.Icon; findPattern: string | null; settings: DefinedSettings; } & ModalProps) {
    const [color, setColor] = useColorNavigation(getColorIndex("INTERACTIVE_ICON_DEFAULT"));

    const openActionsMenu = (e: React.MouseEvent) => {
        ContextMenuApi.openContextMenu(e, () => (
            <ActionsContextMenu iconName={iconName} Icon={Icon} color={color} settings={settings} />
        ));
    };

    const findCode = findPattern
        ? `const ${iconName}Icon = findComponentByCodeLazy(${JSON.stringify(findPattern)})`
        : null;

    return (<ModalRoot {...props} size={ModalSize.DYNAMIC} className={classes("vc-ic-modals-root", "vc-ic-icon-modal-root")}>
        <ModalHeader>
            <ModalHeaderTitle iconName={iconName} currentColor={color} onColor={c => setColor(getColorIndex(c))} />
            <CloseButton onClick={props.onClose} />
        </ModalHeader>
        <ModalContent>
            <div style={{ visibility: findCode && settings.store.preMadeCodeSnippets ? "visible" : "hidden" }} className="vc-icon-modal-codeblock">
                <CodeBlock lang="ts" content={settings.store.preMadeCodeSnippets && findCode || " " /* keeping layout consistent */} />
            </div>

            <div className="vc-icon-modal-main-container">
                <div className="vc-icon-display-box" aria-label={cssColors[color]?.name}>
                    <Icon className="vc-icon-modal-icon" color={cssColors[color]?.css} />
                </div>
                <div className="vc-icon-other-icon-sizes">
                    {iconSizes.map((size, idx) =>
                        <TooltipContainer text={`${size} size`} key={`vc-iv-size-${size}-${idx}`}>
                            <Icon className="vc-icon-modal-size-ex-icon" size={size} color={cssColors[color]?.css} style={{
                                marginLeft: "25px"
                            }} />
                        </TooltipContainer>
                    )}
                </div>
            </div>
        </ModalContent>
        <ModalFooter className="vc-ic-modals-footer">
            <Button variant="primary" onClick={() => copyWithToast(findCode ?? String(Icon), findCode ? "Find code copied!" : "Raw function copied!")}>
                {findCode ? "Copy" : "Copy Raw"}
            </Button>
            <Button variant="secondary" onClick={openActionsMenu}>
                Actions
            </Button>
        </ModalFooter>
    </ModalRoot>);
}

export function openIconModal(iconName: string, Icon: t.Icon, patternFind: string | null, settings: DefinedSettings) {
    openModal(props => <ModalComponent iconName={iconName} Icon={Icon} findPattern={patternFind} settings={settings} {...props} />);
}

