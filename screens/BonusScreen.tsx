import { useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { EpisodeProps } from '../@types/episodes';
import Container from '../components/Container';
import SingleEpisodeBonus from '../components/SingleEpisodeBonus';
import { fetchTopTenEpisodes } from '../lib/bonusDataProvider';

const BonusScreen = () => {
	const [data, setData] = useState<Array<EpisodeProps> | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	// fetch the top 10 episodes
	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetchTopTenEpisodes();
				console.log(response);
				setData(response);
			} catch (error: any) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	// set the header title
	useLayoutEffect(() => {
		navigation.setOptions({ title: 'Bonus assignment' });
	}, [navigation]);

	if (loading) return <ActivityIndicator />;
	if (error) return <Text>{JSON.stringify(error)}</Text>;

	return (
		<Container>
			<Text style={styles.h1}>
				Top 10 episodes with the most unique characters dimensions
			</Text>
			{data?.map((episode: EpisodeProps, index: number) => {
				let props = { index, ...episode };

				return <SingleEpisodeBonus key={episode.id} {...props} />;
			})}
		</Container>
	);
};
export default BonusScreen;
const styles = StyleSheet.create({
	h1: {
		fontSize: 27,
		textAlign: 'center',
		marginVertical: 30,
		fontWeight: 'bold',
		marginBottom: 20,
		marginTop: -16,
	},
});
