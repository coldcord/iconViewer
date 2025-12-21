/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and contributors
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

import "./IconsTab.css";

import { Button } from "@components/Button";
import { Heading } from "@components/Heading";
import { SettingsTab, wrapTab } from "@components/settings/tabs/BaseTab";
import { debounce } from "@shared/debounce";
import { Margins } from "@utils/margins";
import { classes } from "@utils/misc";
import { useIntersection } from "@utils/react";
import { Clickable, React, TextInput, TooltipContainer, useCallback, useEffect, useMemo, useState } from "@webpack/common";

import { openIconModal } from "./IconModal";
import { iconsFinds } from "./names";
import * as t from "./types";
import { getIcons } from "./utils";


function searchMatch(search: string, name: string, Icon: t.Icon, searchByContext: boolean): boolean {
    if (!search) return true;

    if (searchByContext) return String(Icon).includes(search);

    const words = name.replace(/([A-Z]([a-z]+)?)/g, " $1").toLowerCase().split(" ");
    const keywords = search.toLowerCase().split(" ");
    return keywords.every(k => words.includes(k)) ||
        words.every(w => keywords.includes(w)) ||
        name.toLowerCase().includes(search.toLowerCase());
}

function IconItem({ iconName, Icon, patternFind }: { iconName: string; Icon: t.Icon; patternFind: string | null; }) {
    return (
        <div className="vc-icon-box">
            <Clickable onClick={() => openIconModal(iconName, Icon, patternFind)}>
                <div className="vc-icon-container">
                    <Icon className="vc-icon-icon" size="lg" width={32} height={32} color="var(--interactive-icon-default)" />
                </div>
            </Clickable>
            <Heading className="vc-icon-title" tag="h3">{iconName}</Heading>
        </div>
    );
}

function IconsTab() {
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [searchByFunction, setSearchByFunction] = useState(false);

    const icons = useMemo(() => getIcons(), []);

    const debouncedSetSearch = useMemo(
        () => debounce((query: string) => setSearch(query), 150),
        []
    );

    const onSearch = useCallback((query: string) => {
        setSearchInput(query);
        debouncedSetSearch(query);
    }, [debouncedSetSearch]);

    const filteredIcons = useMemo(() =>
        Object.entries(icons).filter(([name, Icon]) => searchMatch(search, name, Icon, searchByFunction)),
        [icons, search, searchByFunction]
    );

    const iconsToLoad = 120;
    const [visibleCount, setVisibleCount] = useState(iconsToLoad);

    useEffect(() => {
        setVisibleCount(iconsToLoad);
    }, [search, searchByFunction]);

    const loadMore = useCallback(() => {
        setVisibleCount(v => Math.min(v + iconsToLoad, filteredIcons.length));
    }, [filteredIcons.length]);

    const [sentinelRef, isSentinelVisible] = useIntersection();

    useEffect(() => {
        if (isSentinelVisible && visibleCount < filteredIcons.length) {
            loadMore();
        }
    }, [isSentinelVisible, visibleCount, filteredIcons.length, loadMore]);

    const visibleIcons = filteredIcons.slice(0, visibleCount);

    return (
        <SettingsTab>
            <div className={classes(Margins.top16, "vc-icon-tab-search-bar-grid")}>
                <TextInput autoFocus value={searchInput} placeholder="Search for an icon..." onChange={onSearch} />
                <TooltipContainer text="Search by function context">
                    <Button
                        size="small"
                        aria-label="Search by function context"
                        className="vc-icon-search-func-btn"
                        variant={searchByFunction ? "positive" : "primary"}
                        onClick={() => setSearchByFunction(!searchByFunction)}
                    >
                        Func
                    </Button>
                </TooltipContainer>
            </div>
            <div className="vc-icons-tab-grid-container">
                {visibleIcons.map(([iconName, Icon]) => (
                    <IconItem key={iconName} iconName={iconName} Icon={Icon} patternFind={iconsFinds[iconName] ?? null} />
                ))}
            </div>
            {visibleCount < filteredIcons.length && (
                <div ref={sentinelRef} className="vc-icon-sentinel" />
            )}
        </SettingsTab>
    );
}

export default wrapTab(IconsTab, "IconsTab");
