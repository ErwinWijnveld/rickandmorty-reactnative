export type EpisodeProps = {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
    differentDimensions?: number | any;
    charactersByDimension?: object[] | any;
};