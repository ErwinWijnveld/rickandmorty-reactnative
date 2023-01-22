import { createContext, useContext, useState } from 'react';
import { EpisodeProps } from '../@types/episodes';
import {
	EpisodeFetchProps,
	fetchProps,
	ReturnCharacters,
} from '../@types/fetch';
import { fetchEpisodes } from '../lib/dataProvider';
import { newSearch } from '../lib/store';

type EpisodeDataContext = {
	data: Array<EpisodeProps> | null;
	isLoading: boolean;
	error: any;
	fetchData: (props: EpisodeFetchProps) => void;
};

const EpisodeDataContext = createContext<EpisodeDataContext | undefined>(
	undefined
);

const EpisodeDataProvider = ({ children, ...rest }: any) => {
	const [data, setData] = useState<Array<EpisodeProps> | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// fetch data that accepts fetchProps and returns episodes
	const fetchData = async (props: EpisodeFetchProps) => {
		setIsLoading(true);
		try {
			// fetch data
			const res = await fetchEpisodes(props);
			if (res?.length < 1) {
				setError('No episodes found');
			} else {
				setError(null);
				setData(res);
			}
		} catch (e: any) {
			setError(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<EpisodeDataContext.Provider
			{...rest}
			value={{ data, isLoading, error, fetchData }}
		>
			{children}
		</EpisodeDataContext.Provider>
	);
};

export const useEpisodesData = () => {
	const context = useContext(EpisodeDataContext);

	// if you are trying to use this hook outside of a provider
	if (context === undefined) {
		throw new Error('Use it inside of a provider, dummy.');
	}

	return {
		data: context.data,
		isLoading: context.isLoading,
		error: context.error,
		fetchData: context.fetchData,
	};
};

export default EpisodeDataProvider;
