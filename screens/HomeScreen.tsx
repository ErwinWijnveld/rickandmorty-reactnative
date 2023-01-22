import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CharacterArchive from '../components/CharacterArchive';
import Container from '../components/Container';
import Search from '../components/Search';
import { COLORS } from '../lib/consts';
import { RootStackParamList } from '../navigation/Navigator';

export default function HomeScreen() {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	return (
		<Container>
			<TouchableOpacity
				style={homeStyles.button}
				onPress={() => navigation.navigate('bonus')}
			>
				<Text>Bonus assignment</Text>
			</TouchableOpacity>
			<Search />
			<CharacterArchive />
		</Container>
	);
}

export const homeStyles = StyleSheet.create({
	button: {
		backgroundColor: COLORS.greyTint,
		borderRadius: 10,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 10,
	},
});
