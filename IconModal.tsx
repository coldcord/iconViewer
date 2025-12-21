/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { CodeBlock } from "@components/CodeBlock";
import { classes } from "@utils/misc";
import {
    ModalContent,
    ModalFooter,
    ModalProps,
    ModalSize,
    openModal
} from "@utils/modal";
import { findComponentByCodeLazy } from "@webpack";
import { TooltipContainer, useCallback, useEffect, useState } from "@webpack/common";

import { BaseIconModal } from "./baseIconModal";
import { IconsFinds } from "./names";
import * as t from "./types";
import { colorKeys, cssColors, getColorIndex, iconSizes } from "./utils";

const CloseButton = findComponentByCodeLazy("CLOSE_BUTTON_LABEL");

function useColorNavigation(initialColor: number) {
    const [color, setColor] = useState(initialColor);

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        event.preventDefault();
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
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

function ModalComponent({ iconName, Icon, ...props }: { iconName: string; Icon: t.Icon; } & ModalProps) {
    const [color, setColor] = useColorNavigation(getColorIndex("INTERACTIVE_ICON_DEFAULT"));

    return (<BaseIconModal {...props}
        iconName={iconName}
        size={ModalSize.DYNAMIC}
        className={classes("vc-ic-modals-icon", "vc-ic-icon-modal-icon")}
        name="root-icon" currentColor={color} onColor={c => setColor(getColorIndex(c))}>
        <ModalContent>
            {IconsFinds[iconName] ?
                <div className="vc-icon-modal-codeblock">
                    <CodeBlock lang="ts" content={`const ${iconName}Icon = findComponentByCodeLazy(${JSON.stringify(IconsFinds[iconName])})`} />
                </div>
                : <></>
            }
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
        </ModalFooter>
    </BaseIconModal>);
}

export function openIconModal(iconName: string, Icon: t.Icon, patternFind?: string) {
    openModal(props => <ModalComponent iconName={iconName} Icon={Icon} {...props} />);
}

