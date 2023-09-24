import { PlayDetail } from "src/modules/data/data.types";

export const MONTH_NAME_NUMBER_MAPPING: Record<string, number> = {
    'january': 1,
    'february': 2,
    'march': 3,
    'april': 4,
    'may': 5,
    'june': 6,
    'july': 7,
    'august': 8,
    'september': 9,
    'october': 10,
    'november': 11,
    'december': 12
}

export function getTotalPlayCounts(playDetails: PlayDetail[]): number {
    return playDetails.reduce((acc, curr) => (curr.Plays + acc), 0)
}

