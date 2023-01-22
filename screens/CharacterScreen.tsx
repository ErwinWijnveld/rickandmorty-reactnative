import { useNavigation, useRoute } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import {
	ActivityIndicator,
	Dimensions,
	Image,
	StyleSheet,
	Text,
} from 'react-native';
import { CharacterProps } from '../@types/characters';
import Container from '../components/Container';
import SingleEpisode from '../components/SingleEpisode';
import { useEpisodesData } from '../hooks/useEpisodesData';
import { clearSearches } from '../lib/store';

const fullWidth = Dimensions.get('window').width - 64;

export default function CharacterScreen() {
	const router = useRoute();
	const navigation = useNavigation();
	const { isLoading, data, fetchData } = useEpisodesData();

	// get the current character from the route params
	const character = (router?.params as { character: CharacterProps })
		?.character;

	// set screen header title
	useLayoutEffect(() => {
		navigation.setOptions({ title: character.name });
		fetchData({ episodes: character.episode });
	}, [navigation, character]);

	return (
		<Container>
			<Image source={{ uri: character.image }} style={styles.image} />
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<>
					<Text>Episodes:</Text>
					{data?.map((episode) => (
						<SingleEpisode key={episode.id} {...episode} />
					))}
				</>
			)}
		</Container>
	);
}

const styles = StyleSheet.create({
	image: {
		width: fullWidth,
		aspectRatio: 1,
		marginBottom: 20,
	},
});
