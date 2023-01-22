import { CharacterProps } from "./characters";

export type fetchProps = {
    page: number;
    name?: string | null;
}

export type ReturnCharacters = {
    info?: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    };
    results: CharacterProps[];
    error?: string;
}

export type EpisodeFetchProps = {
    episodes: string[];
}