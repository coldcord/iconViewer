/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and Megumin
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

import IconsTab from "./IconsTab";


export default definePlugin({
    name: "IconViewer",
    description: "Adds a new tab to settings, to preview all icons",
    authors: [Devs.iamme],
    dependencies: ["Settings"],
    patches: [
        {
            find: "Messages.ACTIVITY_SETTINGS",
            replacement: {
                match: /(shouldMergeGameSettings.{0,10}return )(\i\.useMemo\(\(\)=>\i\(.{0,10}\i,\i\]\))/,
                replace: (_, rest, settingsHook) => `${rest}$self.wrapSettingsHook(${settingsHook})`
            }
        }
    ],

    wrapSettingsHook(elements: Record<string, unknown>[]) {
        const elementIndex = elements.findIndex(
            ({ section }) =>
                section === (!IS_DEV ? "VencordSettingsSync" : "VencordPatchHelper")
        );
        if (elementIndex !== -1)
            elements.splice(elementIndex + 1, 0, {
                section: "VencordDiscordIcons",
                label: "Icons",
                element: IconsTab,
                className: "vc-discord-icons"
            });
        return elements;
    },
});
