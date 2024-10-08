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
import { findByPropsLazy } from "@webpack";
import { Text, TooltipContainer, useCallback, useEffect, useState } from "@webpack/common";
import * as t from "@webpack/types";

const Colors = findByPropsLazy("colors", "layout");
const cssColors = new Proxy(
    {},
    {
        get: (target, key) => {
            if (Number(key) < 0)
                key = String(Object.keys(Colors.colors).length + Number(key));
            const colorKey = Object.keys(Colors.colors)[key];
            return key in target
                ? target[key]
                : Colors.colors[colorKey]?.css != null ? (target[key] = { name: colorKey.split("_").map((x: string) => x[0].toUpperCase() + x.toLowerCase().slice(1)).join(" "), css: Colors.colors[colorKey].css, key: colorKey }) : undefined;
        }
    }
) as unknown as Array<{ name: string; css: string; key: string; }>;
const iconSizes = ["lg", "md", "sm", "xs", "xxs"].reverse();


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
            <Text variant="heading-lg/semibold" style={{ flexGrow: 1 }}>{`${iconName} - ${cssColors[color]?.name ?? "unknown"}`}</Text>
            <ModalCloseButton onClick={props.onClose} />
        </ModalHeader>
        <ModalContent>
            <div className="vc-icon-modal-main-container">
                <div className="vc-icon-display-box" aria-label={cssColors[color]?.name ?? "unknown"} aria-key={cssColors[color]?.key}>
                    <Icon className="vc-icon-modal-icon" color={cssColors[color]?.css} />
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

