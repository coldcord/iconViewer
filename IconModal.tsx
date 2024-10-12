/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import {
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalRoot,
    ModalSize,
    openModal
} from "@utils/modal";
import { Text, TooltipContainer, useCallback, useEffect, useState } from "@webpack/common";
import * as t from "@webpack/types";

import { cssColors, iconSizes, iconSizesInPx, saveIcon } from "./utils";



function ModalComponent(props) {
    const [color, SetColor] = useState(187);
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            if (e.key === "ArrowLeft") {
                SetColor(color + -1);
            } else if (e.key === "ArrowRight") {
                SetColor(color + 1);
            }
        }
    }, [color]);
    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [onKeyDown]);
    const { iconName, Icon }: { iconName: string; Icon: t.Icon; } = props;
    return (<ModalRoot {...props} size={ModalSize.MEDIUM}>
        <ModalHeader>
            <Text variant="heading-lg/semibold" style={{ flexGrow: 1 }}>{`${iconName} - ${cssColors[color]?.name}`}</Text>
            <ModalCloseButton onClick={props.onClose} />
        </ModalHeader>
        <ModalContent>
            <div className="vc-icon-modal-main-container">
                <div className="vc-icon-display-box" aria-label={cssColors[color].name} aria-key={cssColors[color]?.key}>
                    <Icon className="vc-icon-modal-icon" color={cssColors[color].css} onClick={event => saveIcon(iconName, event.currentTarget, color, iconSizesInPx.lg)} />
                </div>
                <div className="vc-icon-other-icon-sizes">
                    {iconSizes.map((size, idx) =>
                        <TooltipContainer text={`${size} size`}>
                            <Icon className="vc-icon-modal-size-ex-icon" size={size as any} color={cssColors[color]?.css} style={{
                                marginLeft: "25px"
                            }} />
                        </TooltipContainer>
                    )}
                </div>
            </div>
        </ModalContent>
    </ModalRoot>);
}

export function openIconModal(iconName: string, Icon: t.Icon) {
    openModal(props => <ModalComponent iconName={iconName} Icon={Icon} {...props} />);
}

