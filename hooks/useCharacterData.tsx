import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useState } from 'react';
import { fetchProps, ReturnCharacters } from '../@types/fetch';
import { fetchCharacters } from '../lib/dataProvider';
import { newSearch } from '../lib/store';

type CharacterDataContext = {
	data: ReturnCharacters | null;
	isLoading: boolean;
	error: any;
	fetchData: (props: fetchProps) => void;
	searches: Array<string> | null;
};

const CharacterDataContext = createContext<CharacterDataContext | undefined>(
	undefined
);

const CharacterDataProvider = ({ children, ...rest }: any) => {
	const [data, setData] = useState<ReturnCharacters | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [searches, setSearches] = useState<Array<string> | null>(null);

	// fetch data that accepts fetchProps and returns characters
	const fetchData = async (props: fetchProps) => {
		setIsLoading(true);
		try {
			// get new searches
			const newSearches = await newSearch(props.name);
			if (newSearches) {
				setSearches(JSON.parse(newSearches));
			}

			// fetch data
			const res = await fetchCharacters(props);
			if (res?.error) {
				setError(res.error);
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
		<CharacterDataContext.Provider
			{...rest}
			value={{ data, isLoading, error, fetchData, searches }}
		>
			{children}
		</CharacterDataContext.Provider>
	);
};

export const useCharacterData = () => {
	const context = useContext(CharacterDataContext);

	// if you are trying to use this hook outside of a provider
	if (context === undefined) {
		throw new Error('Use it inside of a provider, dummy.');
	}

	return {
		data: context.data,
		isLoading: context.isLoading,
		error: context.error,
		fetchData: context.fetchData,
		searches: context.searches,
	};
};

export default CharacterDataProvider;
