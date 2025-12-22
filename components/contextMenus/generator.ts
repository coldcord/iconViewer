/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

function isUniquePattern(pattern: string, allStrings: string[]) {
    let count = 0;
    for (const str of allStrings) {
        if (str.includes(pattern)) {
            count++;
            if (count > 1) return false;
        }
    }
    return count === 1;
}

function getCenterOutIndices(length) {
    const res: number[] = [];
    const mid: number = Math.floor(length / 2);
    res.push(mid);

    for (let offset = 1; offset <= length; offset++) {
        const left = mid - offset;
        const right = mid + offset;

        // try left side of center
        if (left >= 0) res.push(left);
        // try right side of center
        if (right < length) res.push(right);

        if (left < 0 && right >= length) break;
    }
    return res;
}


function shuffleArray(array: any[]) {
    return array.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

export async function findBestSmallestPattern(iconSource: string, allStrings: string[], shuffle: boolean = false, startingLength: number = 20) {
    const sourceLength = iconSource.length;

    for (let len = startingLength; len <= sourceLength; len++) {

        const possibleStarts = sourceLength - len + 1;

        const indicesToCheck = shuffle ? shuffleArray(getCenterOutIndices(possibleStarts)) : getCenterOutIndices(possibleStarts);

        for (const i of indicesToCheck) {
            const substring = iconSource.substring(i, i + len);

            if (isUniquePattern(substring, allStrings)) {
                return substring;
            }
        }
    }
    return iconSource; // fallback
}
