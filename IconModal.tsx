/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Button } from "@components/Button";
import { CodeBlock } from "@components/CodeBlock";
import { Margins } from "@utils/margins";
import { classes } from "@utils/misc";
import {
    ModalContent,
    ModalFooter,
    ModalProps,
    ModalSize,
    openModal
} from "@utils/modal";
import { TooltipContainer, useCallback, useEffect, useState } from "@webpack/common";

import { BaseIconModal } from "./baseIconModal";
import { IconsFinds } from "./names";
import { openRawModal } from "./rawModal";
import { openSaveModal } from "./saveModal";
import * as t from "./types";
import { colorKeys, cssColors, getColorIndex, iconSizes } from "./utils";


function ModalComponent({ iconName, Icon, ...props }: { iconName: string; Icon: t.Icon; } & ModalProps) {
    const [color, SetColor] = useState(getColorIndex("INTERACTIVE_ICON_DEFAULT"));

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        event.preventDefault();
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            const { length } = colorKeys;
            const direction = event.key === "ArrowLeft" ? -1 : 1;
            SetColor(prev => (prev + direction + length) % length);
        }
    }, [color]);

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [onKeyDown]);

    return (<BaseIconModal {...props}
        iconName={iconName}
        size={ModalSize.DYNAMIC}
        className={classes("vc-ic-modals-root", "vc-ic-icon-modal-root")}
        name="root-icon" color={color}>
        <ModalContent>
            {IconsFinds[iconName] ?
                <div className="vc-icon-modal-codeblock">
                    <CodeBlock lang="ts" content={`const ${iconName + "Icon"} = findComponentByCode(${JSON.stringify(IconsFinds[iconName])})`} />
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
            <Button
                onClick={() => openSaveModal(iconName, Icon, color)}
            >
                Save as
            </Button>
            <Button
                variant="secondary"
                className={classes(Margins.right8, "vc-iv-raw-modal-button")}
                onClick={() => openRawModal(iconName, Icon, color)}
            >
                Raw
            </Button>
        </ModalFooter>
    </BaseIconModal>);
}

export function openIconModal(iconName: string, Icon: t.Icon) {
    openModal(props => <ModalComponent iconName={iconName} Icon={Icon} {...props} />);
}

