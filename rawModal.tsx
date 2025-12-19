/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Button } from "@components/Button";
import { CodeBlock } from "@components/CodeBlock";
import { copyToClipboard } from "@utils/clipboard";
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
import { Toasts } from "@webpack/common";

import { ModalHeaderTitle } from "./subComponents";
import * as t from "./types";



function ModalComponent(props: { iconFn: Function; iconName: string; color: number; } & ModalProps) {
    const { iconFn, iconName, color } = props;
    return (<ModalRoot {...props} size={ModalSize.LARGE} className="vc-ic-modals-root vc-ic-raw-modal-root">
        <ModalHeader>
            <ModalHeaderTitle iconName={iconName} color={color} name="raw" />
            <ModalCloseButton onClick={props.onClose} />
        </ModalHeader>
        <ModalContent>
            <div className="vc-iv-raw-modal">
                <CodeBlock content={String(iconFn)} lang="js" />
            </div>
        </ModalContent>
        <ModalFooter className="vc-ic-modals-footer">
            <Button
                className={"vc-iv-raw-modal-copy-button"}
                onClick={() => {
                    // silly typescript
                    // @ts-ignore
                    copyToClipboard(String(iconFn));
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
                variant="positive"
                className={classes(Margins.right8, "vc-iv-log-to-console-button")}
                onClick={() => { console.log(iconFn); }}
            >
                log to console
            </Button>
        </ModalFooter>
    </ModalRoot>);
}

export function openRawModal(iconName: string, Icon: t.Icon, colorIndex: number) {
    openModal(props => <ModalComponent iconName={iconName} iconFn={Icon} color={colorIndex} {...props} />);
}

