import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { CharacterProps } from '../@types/characters';
import { COLORS } from '../lib/consts';
import { RootStackParamList } from '../navigation/Navigator';

const SingleCharacter = (character: CharacterProps) => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const navigateToCharacter = (character: CharacterProps) => {
		navigation.navigate('character', { character });
	};

	// status label colors
	const statusColor =
		character.status === 'Alive'
			? COLORS.green
			: character.status === 'unknown'
			? COLORS.darkGrey
			: COLORS.red;

	return (
		<TouchableOpacity
			onPress={() => navigateToCharacter(character)}
			style={styles.container}
		>
			<Image source={{ uri: character.image }} style={styles.image} />
			<View>
				<Text numberOfLines={1} style={styles.name}>
					{character.name}
				</Text>
				<View
					style={[
						styles.statusContainer,
						{ backgroundColor: statusColor },
					]}
				>
					<Text style={styles.status}>{character.status}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};
export default SingleCharacter;
const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		backgroundColor: COLORS.greyTint,
		padding: 10,
		marginBottom: 10,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'row',
	},
	name: {
		fontWeight: 'bold',
		fontSize: 20,
		maxWidth: 200,
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 10,
		marginRight: 20,
	},
	statusContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
		borderRadius: 10,
		padding: 5,
		paddingHorizontal: 8,
		marginTop: 5,
	},
	status: {
		fontSize: 12,
		color: 'white',
		fontWeight: 'bold',
	},
});
