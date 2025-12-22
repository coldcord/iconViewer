/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { PaintbrushIcon } from "@components/Icons";
import definePlugin, { StartAt } from "@utils/types";
import { SettingsRouter } from "@webpack/common";

import IconsTab from "./components/IconsTab";
import { settings, SettingsAbout } from "./components/settings";


export default definePlugin({
    name: "IconViewer",
    description: "Preview icons and copy Discord CSS colors via a new settings tab.",
    // @ts-ignore
    authors: [{
        name: "iamme",
        id: 984392761929256980n
    }],
    dependencies: ["Settings"],
    startAt: StartAt.WebpackReady,
    toolboxActions: {
        "Open Icons Tab"() {
            SettingsRouter.open("vencord_discord_icons_viewer");
        },
    },
    settingsAboutComponent: SettingsAbout,
    settings: settings,
    start() {
        // @ts-ignore
        Vencord.Plugins.plugins.Settings.customEntries.push({
            key: "vencord_discord_icons_viewer",
            title: "Icon Finder",
            Component: IconsTab,
            Icon: PaintbrushIcon
        });
    },
    stop() {
        // @ts-ignore
        const { customEntries } = Vencord.Plugins.plugins.Settings;
        customEntries.splice(customEntries.findIndex(setting => setting.key === "vencord_discord_icons_viewer"), 1);
    },
});
