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
    ModalContent,
    ModalFooter,
    ModalProps,
    ModalSize,
    openModal
} from "@utils/modal";
import { showToast, Toasts } from "@webpack/common";

import { BaseIconModal } from "./baseIconModal";
import * as t from "./types";



function ModalComponent({ iconFn, iconName, ...props }: { iconFn: Function; iconName: string; color: number; } & ModalProps) {
    return (<BaseIconModal {...props}
        iconName={iconName}
        size={ModalSize.LARGE}
        className={classes("vc-ic-modals-root", "vc-ic-raw-modal-root")}
        name="raw">
        <ModalContent>
            <div className="vc-iv-raw-modal">
                <CodeBlock content={String(iconFn)} lang="js" />
            </div>
        </ModalContent>
        <ModalFooter className="vc-ic-modals-footer">
            <Button
                className={"vc-iv-raw-modal-copy-button"}
                onClick={() => {
                    copyToClipboard(String(iconFn));
                    showToast(`Copied raw \`${iconName}\` to clipboard`, Toasts.Type.SUCCESS);
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
    </BaseIconModal>);
}

export function openRawModal(iconName: string, Icon: t.Icon, colorIndex: number) {
    openModal(props => <ModalComponent iconName={iconName} iconFn={Icon} color={colorIndex} {...props} />);
}

