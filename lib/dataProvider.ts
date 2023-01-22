import * as SecureStore from 'expo-secure-store';
import { EpisodeProps } from '../@types/episodes';
import { EpisodeFetchProps, fetchProps, ReturnCharacters } from '../@types/fetch';

// get characters by name and page
export const fetchCharacters = async (props: fetchProps): Promise<ReturnCharacters> => {
    const { page = 1, name = '' } = props;
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character' + '?page=' + page + '&name=' + name);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// get episodes by array of endpoints
export const fetchEpisodes = async (props: EpisodeFetchProps): Promise<Array<EpisodeProps>> => {
    const { episodes } = props;
    if(!episodes) return [];
    if(episodes.length === 0) return [];
    
    let episodesData;
    
    /**
     * Extra request for each episode
     */
    // const episodesData = await Promise.all(episodes.map(async (episode: string) => {
    //     try {
    //         const response = await fetch(episode);
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.error(error);
    //         return null
    //     }
    // }));


    /**
     * optimize by fetching all episodes at once
     */ 
    try {
        const response = await fetch('https://rickandmortyapi.com/api/episode/' + episodes?.map( (episode: string) => Number(episode?.split('/')?.pop() || 0 )));
        const data = await response.json();
        if(!data) {
            episodesData = [];
        } else {
            episodesData = Array.isArray(data) ? data : [data];
        }
    }
    catch (error) {
        console.error(error);
        episodesData = []
    }

    return episodesData;
}