/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Margins } from "@utils/margins";
import { classes } from "@utils/misc";
import {
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalRoot,
    ModalSize,
    openModal
} from "@utils/modal";
import { Button, Forms, Select, Text, TextInput, useCallback, useEffect, useState } from "@webpack/common";
import * as t from "@webpack/types";

import { convertComponentToHtml, cssColors, iconSizesInPx, IconTooltip, saveIcon } from "./utils";

export function NumericComponent({ onChange, value }: { onChange: (value: number) => void, value: number; }) {
    const handleChange = (value: string) => {
        const newValue = Number(value);
        if (isNaN(newValue)) return;
        onChange(newValue);
    };

    return (
        <TextInput
            type="number"
            pattern="-?[0-9]+"
            value={value}
            placeholder="Enter a number"
            onChange={handleChange}
        />
    );
}


export function SelectComponent({ option, onChange, onError }: { option: any, onChange: (value: any) => void, onError: (msg: string | null) => void; }) {
    const [state, setState] = useState(option.options?.find(o => o.default)?.value ?? null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => onError(error), [error]);

    const handleChange = (newValue: any) => {
        const isValid = option.isValid?.call({}, newValue) ?? true;
        if (!isValid) setError("Invalid input provided.");
        else {
            setError(null);
            setState(newValue);
            onChange(newValue);
        }
    };

    return (<>
        <Select
            options={option.options}
            placeholder={"Select an option"}
            maxVisibleItems={5}
            closeOnSelect={true}
            select={handleChange}
            isSelected={v => v === state}
            serialize={v => String(v)}
        />
        {error && <Forms.FormText style={{ color: "var(--text-danger)" }}>{error}</Forms.FormText>}
    </>);
}


function ModalComponent(props) {
    const [color, SetColor] = useState((props.colorIndex ?? 187) as number);
    const [iconSize, SetIconSize] = useState("lg");
    const [saveType, SetSaveType] = useState("png");
    const [customSize, SetCustomSize] = useState(32);
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
            <Text variant="heading-lg/semibold" style={{ flexGrow: 1, display: "flex" }}><IconTooltip copy={iconName} className={classes(Margins.right8, "vc-icon-modal-color-tooltip")}>{iconName}</IconTooltip> - <IconTooltip copy={cssColors[color]?.css} className={classes(Margins.left8, "vc-icon-modal-color-tooltip")}>{cssColors[color]?.name}</IconTooltip></Text>
            <ModalCloseButton onClick={props.onClose} />
        </ModalHeader>
        <ModalContent>
            <div className="vc-save-modal">
                <div className="vc-icon-display-box" aria-label={cssColors[color].name} aria-key={cssColors[color]?.key} style={{ marginLeft: "0", marginTop: "0" }}>
                    <Icon className="vc-icon-modal-icon" color={cssColors[color].css} onClick={event => saveIcon(iconName, event.currentTarget, color, iconSizesInPx.lg)} />
                </div>
                <div className="vc-save-options" style={{ marginTop: "0", marginLeft: "0" }}>
                    <SelectComponent option={{
                        options: [
                            { "label": "large", "value": "lg", "default": true },
                            { "label": "medium", "value": "md" },
                            { "label": "small", "value": "sm" },
                            { "label": "custom", "value": "custom" }
                        ]
                    } as any} onChange={newValue => SetIconSize(newValue)} onError={() => { }} />
                    <SelectComponent option={{
                        options: [
                            { "label": "png", "value": "image/png", "default": true },
                            { "label": "jpeg", "value": "image/jpeg	" },
                            { "label": "svg", "value": "image/svg+xml" },
                        ]
                    } as any} onChange={newValue => SetSaveType(newValue)} onError={() => { }} />
                    {iconSize === "custom" && <NumericComponent value={32} onChange={SetCustomSize} />}
                </div>
            </div>
        </ModalContent>
        <ModalFooter>
            <Button
                color={Button.Colors.BRAND}
                onClick={() => saveIcon(iconName,
                    saveType === "image/svg+xml" || document.querySelector(".vc-icon-modal-icon") == null ?
                        convertComponentToHtml(<Icon className="vc-icon-modal-icon" color={cssColors[color].css} />) :
                        document.querySelector(".vc-icon-modal-icon") as Element,
                    color, iconSizesInPx[iconSize] ?? customSize, saveType)}
            >
                Save
            </Button>
        </ModalFooter>
    </ModalRoot>);
}

export function openSaveModal(iconName: string, Icon: t.Icon, colorIndex?: number) {
    openModal(props => <ModalComponent iconName={iconName} Icon={Icon} colorIndex={colorIndex} {...props} />);
}

