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

import definePlugin from "@utils/types";

// import settings from "../_core/settings";
import IconsTab from "./IconsTab";

export default definePlugin({
  name: "IconViewer",
  description: "Adds a new tab to settings, to preview all icons",
  authors: [],
  dependencies: ["Settings"],
  insertSettings() {
    return {
      section: "VencordDiscordIcons",
      label: "Icons",
      element: IconsTab,
      className: "vc-discord-icons",
    };
  },
  start() {
    Vencord.Plugins.plugins.Settings.customSections.push(this.insertSettings);
  },
  stop() {
    Vencord.Plugins.plugins.Settings.customSections =
      Vencord.Plugins.plugins.Settings.customSections.filter(
        (x) => x !== this.insertSettings
      );
  },
});
