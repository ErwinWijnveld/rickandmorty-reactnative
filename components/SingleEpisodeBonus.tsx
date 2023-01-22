import { Image, StyleSheet, Text, View } from 'react-native';
import { EpisodeProps } from '../@types/episodes';
import { COLORS } from '../lib/consts';
const SingleEpisodeBonus = ({
	name,
	air_date,
	episode,
	differentDimensions,
	charactersByDimension,
	index,
}: EpisodeProps & { index?: number }) => {
	return (
		<View style={styles.container}>
			{differentDimensions && (
				<Text style={styles.count}>{Number(index) + 1}.</Text>
			)}
			<View>
				{name && <Text>{name}</Text>}
				{differentDimensions && (
					<Text>Unique dimensions: {differentDimensions}</Text>
				)}
				{charactersByDimension?.map((dimension: any, index: number) => (
					<View style={styles.dimensionContainer} key={index}>
						<Text
							key={dimension.dimension}
							style={styles.dimensionText}
						>
							{dimension.dimension}:
						</Text>
						<View style={styles.flexCenter}>
							{dimension.characters.map((character: any) => (
								<Image
									key={character.id}
									source={{
										uri: character.image,
									}}
									style={styles.image}
								/>
							))}
						</View>
					</View>
				))}
			</View>
		</View>
	);
};
export default SingleEpisodeBonus;
const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.greyTint,
		borderRadius: 10,
		padding: 10,
		marginBottom: 10,
		display: 'flex',
		flexDirection: 'row',
	},
	count: {
		fontSize: 20,
		fontWeight: 'bold',
		marginRight: 20,
		marginLeft: 10,
		flexShrink: 0,
	},
	flexCenter: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	dimensionContainer: {
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 10,
		marginBottom: 10,
		marginRight: 50,
		marginTop: 10,
	},
	dimensionText: {
		fontSize: 10,
		fontWeight: 'bold',
	},
	image: {
		width: 50,
		height: 50,
		marginRight: 10,
		marginTop: 6,
	},
});
