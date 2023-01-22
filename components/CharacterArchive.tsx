import { ActivityIndicator, Text, View } from 'react-native';
import { CharacterProps } from '../@types/characters';
import { useCharacterData } from '../hooks/useCharacterData';
import SingleCharacter from './SingleCharacter';

const CharacterArchive = () => {
	const { isLoading, data, error } = useCharacterData();

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text>{JSON.stringify(error)}</Text>;
	}

	return (
		<View>
			{data?.results?.map((character: CharacterProps) => (
				<SingleCharacter {...character} key={character.id} />
			))}
		</View>
	);
};
export default CharacterArchive;
