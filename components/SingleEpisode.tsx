import { StyleSheet, Text, View } from 'react-native';
import { EpisodeProps } from '../@types/episodes';
import { COLORS } from '../lib/consts';
const SingleEpisode = ({ name, air_date, episode }: EpisodeProps) => {
	return (
		<View style={styles.container}>
			<View>
				{name && <Text>{name}</Text>}
				{air_date && <Text>{air_date}</Text>}
				{episode && <Text>{episode}</Text>}
			</View>
		</View>
	);
};
export default SingleEpisode;
const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.greyTint,
		borderRadius: 10,
		padding: 10,
		marginBottom: 10,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	count: {
		fontSize: 20,
		fontWeight: 'bold',
		marginRight: 20,
		marginLeft: 10,
		flexShrink: 0,
	},
});
