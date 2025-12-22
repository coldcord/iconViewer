/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { copyWithToast } from "@utils/discord";
import { DefinedSettings } from "@utils/types";
import { Icon } from "@vencord/discord-types";
import { findComponentByCodeLazy } from "@webpack";
import {
    FluxDispatcher,
    Menu
} from "@webpack/common";

// eslint-disable-next-line
import { convertToHtml, cssColors, getIcons, iconSizesInPx, logger, saveIcon } from "../utils";
import { findBestSmallestPattern } from "./generator";

const BugIcon = findComponentByCodeLazy("1.1.27.1.37 0a6.66 6.6");
const MagnifyingGlassIcon = findComponentByCodeLazy(/14 0Z",clipRule:"evenodd",className:\i\}\)\}/);

// find uniquest smallest pattern
async function findUniquePattern(iconName: string, Icon: Icon, settings: DefinedSettings) {
    const source = String(Icon);
    const allSources = Object.values(getIcons()).map(i => String(i));
    const generatedFind = await findBestSmallestPattern(source, allSources, settings.store.randomizeGeneratedFind);
    logger.info(`smallest uniquest pattern found for icon ${iconName}: ${JSON.stringify(generatedFind)}`);
    if (!isNaN(parseFloat(iconName))) { // is numeric?
        iconName = "f" + iconName;
    }
    const find = settings.store.copyGeneratedFindAsPreMadeCode ? `const ${iconName}Icon = findComponentByCodeLazy(${JSON.stringify(generatedFind)});`
        : generatedFind;

    copyWithToast(find, "generated find copied! (can be flawed!)");
}


export function ActionsContextMenu({ iconName, Icon, color, settings }: { iconName: string; Icon: Icon; color: number; settings: DefinedSettings; }) {
    const colorData = cssColors[color];

    const handleSave = (type: string) => {
        const size = iconSizesInPx.lg;
        const iconEl = type === "image/svg+xml"
            ? convertToHtml(<Icon className="vc-ic-save-icon" color={colorData?.css} />)
            : document.querySelector(".vc-ic-icon-preview .vc-ic-icon-large") as Element | null;

        if (iconEl) saveIcon(iconName, iconEl, color, size, type);
    };

    return (
        <Menu.Menu
            navId="vc-ic-other-menu"
            onClose={() => FluxDispatcher.dispatch({ type: "CONTEXT_MENU_CLOSE" })}
            aria-label="Icon Options"
        >
            <Menu.MenuItem
                id="log-console"
                label="Log to Console"
                icon={BugIcon}
                action={() => logger.info(Icon)}
            />
            <Menu.MenuItem
                id="generate-unique-find"
                label="generate unique find"
                icon={MagnifyingGlassIcon}
                action={async () => findUniquePattern(iconName, Icon, settings)}
            />
            <Menu.MenuItem id="save" label="Save As...">
                <Menu.MenuItem
                    id="save-png"
                    label="PNG"
                    action={() => handleSave("image/png")}
                />
                <Menu.MenuItem
                    id="save-svg"
                    label="SVG"
                    action={() => handleSave("image/svg+xml")}
                />
                <Menu.MenuItem
                    id="save-jpeg"
                    label="JPEG"
                    action={() => handleSave("image/jpeg")}
                />
                <Menu.MenuItem
                    id="save-webp"
                    label="WEBP"
                    action={() => handleSave("image/webp")}
                />
                <Menu.MenuItem
                    id="save-gif"
                    label="GIF"
                    action={() => handleSave("image/gif")}
                />
                <Menu.MenuItem
                    id="save-avif"
                    label="AVIF"
                    action={() => handleSave("image/avif")}
                />
            </Menu.MenuItem>
        </Menu.Menu>
    );
}
