/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin, { StartAt } from "@utils/types";
import { SettingsRouter } from "@webpack/common";

// import settings from "../_core/settings";
import IconsTab from "./IconsTab";
import { SettingsAbout } from "./subComponents";


export default definePlugin({
    name: "IconViewer",
    description: "Adds a new tab to settings, to preview all icons",
    // @ts-ignore
    authors: [{
        name: "iamme",
        id: 984392761929256980n
    }],
    dependencies: ["Settings"],
    startAt: StartAt.WebpackReady,
    toolboxActions: {
        "Open Icons Tab"() {
            SettingsRouter.open("VencordDiscordIcons");
        },
    },
    settingsAboutComponent: SettingsAbout,
    insertSettings() {
        return {
            section: "VencordDiscordIcons",
            label: "Icons",
            element: IconsTab,
            className: "vc-discord-icons",
        };
    },
    start() {
        // @ts-ignore
        Vencord.Plugins.plugins.Settings.customSections.push(this.insertSettings);
    },
    stop() {
        // @ts-ignore
        const { customSections } = Vencord.Plugins.plugins.Settings;
        customSections.splice(customSections.indexOf(this.insertSettings), 1);
    },
});
