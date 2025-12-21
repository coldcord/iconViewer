/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { getIntlMessage } from "@utils/discord";
import { FluxDispatcher, Menu, useState } from "@webpack/common";


export function ColorContextMenu({ colorKeys, onColor }: { colorKeys: string[]; onColor?: (color: string) => void; }) {
    const [query, setQuery] = useState("");
    const filtered = colorKeys.filter(k =>
        !query || k.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <Menu.Menu
            navId="vc-ic-colors-menu"
            onClose={() => FluxDispatcher.dispatch({ type: "CONTEXT_MENU_CLOSE" })}
            aria-label="Icon Viewer Colors"
        >
            <Menu.MenuControlItem
                id="vc-ic-colors-search"
                control={(props, ref) => (
                    <Menu.MenuSearchControl
                        {...props}
                        query={query}
                        onChange={setQuery}
                        ref={ref}
                        placeholder={getIntlMessage("SEARCH")}
                        autoFocus
                    />
                )}
            />
            <Menu.MenuSeparator />
            {filtered.map(colorKey => (
                <Menu.MenuItem
                    key={colorKey}
                    id={colorKey}
                    label={colorKey}
                    action={() => {
                        if (!onColor) return;
                        onColor(colorKey);
                    }}
                />
            ))}
        </Menu.Menu>
    );
}
