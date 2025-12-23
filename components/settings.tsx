/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { BaseText } from "@components/BaseText";
import { Heading } from "@components/Heading";
import { OptionType } from "@utils/types";

export const settings = definePluginSettings({
    preMadeCodeSnippets: {
        description: "display pre-made find code snippets",
        type: OptionType.BOOLEAN,
        default: true,
    },
    copyGeneratedFindAsPreMadeCode: {
        description: "If enabled, copy the generated find as a JavaScript code snippet (e.g., `const BIcon = findComponentByCode(\"9V2.9c0-.5.4-.9.9-.9h7\")`) otherwise copy generated find value.",
        type: OptionType.BOOLEAN,
        default: true,
    },
    randomizeGeneratedFind: {
        description: "randomly generate a find each time, slower but beneficial in cases where the generated find contains function variable",
        type: OptionType.BOOLEAN,
        default: true,
    }
});

export function SettingsAbout() {
    return <>
        <Heading tag="h3">Features</Heading>
        <BaseText>
            <ul className="vc-ic-unordered-list">
                <li>Preview icons</li>
                <li>Copy icon names and CSS variables</li>
                <li>Ability to download icons in different formats (SVG, PNG, GIF, etc.)</li>
                <li>Copy pre-made icon finds for your plugins (Only some icons have this, submit finds either in a server or DMs)</li>
                <li>Find icons by function context (helpful when creating finds)</li>
                <li>Search for colors by right-clicking the color name in the modal title</li>
            </ul>
        </BaseText>
        <Heading tag="h3">Special thanks</Heading>
        <BaseText className="vc-ic-unordered-list">
            <ul>
                <li>krystalskullofficial._.</li>
                <li>davr1</li>
                <li>suffocate</li>
                <li>dear.prism</li>
            </ul>
        </BaseText>
    </>;
}
