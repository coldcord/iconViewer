/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { CodeBlock } from "@components/CodeBlock";
import { Margins } from "@utils/margins";
import { classes } from "@utils/misc";
import {
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalProps,
    ModalRoot,
    ModalSize,
    openModal
} from "@utils/modal";
import { Button, Text, Toasts } from "@webpack/common";
import * as t from "@webpack/types";

import { IconTooltip } from "./subComponents";
import { cssColors } from "./utils";


function ModalComponent(props: { func: Function; iconName: string; color: number; } & ModalProps) {
    const { func, iconName, color } = props;
    return (<ModalRoot {...props} size={ModalSize.LARGE} className="vc-ic-modals-root vc-ic-raw-modal-root">
        <ModalHeader>
            <Text variant="heading-lg/semibold" style={{ flexGrow: 1, display: "flex" }}><IconTooltip copy={iconName} className={classes(Margins.right8, "vc-raw-modal-color-tooltip")}>{iconName}</IconTooltip> - <IconTooltip copy={cssColors[color]?.css} className={classes(Margins.left8, "vc-raw-modal-color-tooltip")}>{cssColors[color]?.name}</IconTooltip></Text>
            <ModalCloseButton onClick={props.onClose} />
        </ModalHeader>
        <ModalContent>
            <div className="vc-iv-raw-modal">
                <CodeBlock content={String(func)} lang="js" />
            </div>
        </ModalContent>
        <ModalFooter className="vc-ic-modals-footer">
            <Button
                color={Button.Colors.PRIMARY}
                className={"vc-iv-raw-modal-copy-button"}
                onClick={() => {
                    // silly typescript
                    // @ts-ignore
                    Clipboard.copy(String(func));
                    Toasts.show({
                        id: Toasts.genId(),
                        message: `Copied raw \`${iconName}\` to clipboard`,
                        type: Toasts.Type.SUCCESS
                    });
                }}
            >
                Copy
            </Button>
            <Button
                color={Button.Colors.YELLOW}
                className={classes(Margins.right8, "vc-iv-log-to-console-button")}
                onClick={() => { console.log(func); }}
            >
                log to console
            </Button>
        </ModalFooter>
    </ModalRoot>);
}

export function openRawModal(iconName: string, Icon: t.Icon, colorIndex: number) {
    openModal(props => <ModalComponent iconName={iconName} func={Icon} color={colorIndex} {...props} />);
}

