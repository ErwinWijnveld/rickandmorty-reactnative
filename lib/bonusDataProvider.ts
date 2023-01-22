import { CharacterProps } from "../@types/characters";
import { EpisodeProps } from "../@types/episodes";

export const fetchTopTenEpisodes = async (): Promise<Array<EpisodeProps> | any> => {
    try {
        // fetch the first page
        const data = await fetchPage(1)

        if(data) {
            const pages = data.info.pages;
            let episodes = data.results;

            // fetch all the possible pages
            for(let i = 2; i <= pages; i++) {
                try {
                    const data = await fetchPage(i)
                    if(data) {
                        episodes = [...episodes, ...data.results];
                    }
                } catch (error:any) {
                    console.error(error);
                    return error;
                }
            }

            // get unique dimensions and characters for each episode
            const episodesWithUniqueDimensionCount = await Promise.all(episodes.map(async (episode: EpisodeProps) => {
                const episodeCharacters = await fetchCharactersData(episode?.characters);
                
                // get array of dimensions
                const dimensions = episodeCharacters?.map((character:CharacterProps) => character?.origin?.name)

                // make array unique and filter out unknown
                const uniqueDimensions = dimensions?.filter((value, index, self) => {
                    return self.indexOf(value) === index && value !== 'unknown';
                });

                // attach all characters to their dimension
                const charactersByDimension = uniqueDimensions?.map((dimension: string) => {
                    return {
                    dimension: dimension,
                    characters: episodeCharacters.filter((character: CharacterProps) => character.origin.name === dimension)
                    }
                    });                    

                
                return {
                    ...episode,
                    differentDimensions: uniqueDimensions?.length || 0,
                    charactersByDimension: charactersByDimension
                }
            }));

            // sort episodes by dimension count
            episodesWithUniqueDimensionCount.sort((a:EpisodeProps, b:EpisodeProps) => {
                return b.differentDimensions - a.differentDimensions;
            });

            // return top 10
            return episodesWithUniqueDimensionCount.slice(0, 10);
        }
    } catch (error:any) {
        console.error(error);
        return error;
    }
}

// gets a page of episodes
async function fetchPage (page: number) {
    const response = await fetch('https://rickandmortyapi.com/api/episode?page=' + page);
    const data = await response.json();
    return data;
}


// gets all characters and their data for an episode
async function fetchCharactersData(characters: Array<string>) {
    if(!characters) return [];
    let charactersData;

    try {
        const response = await fetch('https://rickandmortyapi.com/api/character/' + characters?.map( (character: string) => Number(character?.split('/')?.pop() || 0 )));
        const data = await response.json();
        if(!data) {
            charactersData = [];
        } else {
            charactersData = Array.isArray(data) ? data : [data];
        }
    }

    catch (error) {
        console.error(error);
        charactersData = []
    }

    return charactersData;
}