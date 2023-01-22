import { Feather, MaterialIcons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	Touchable,
	TouchableOpacity,
	View,
} from 'react-native';
import { useCharacterData } from '../hooks/useCharacterData';
import { COLORS } from '../lib/consts';
import { clearSearches } from '../lib/store';
import { homeStyles } from '../screens/HomeScreen';
const Search = () => {
	const [text, setText] = useState('');

	const { fetchData, searches } = useCharacterData();

	const handleSearch = () => {
		fetchData({ page: 1, name: text });
	};

	// fetch data on mount
	useEffect(() => {
		fetchData({ page: 1, name: '' });
	}, []);

	return (
		<>
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					placeholder="Search"
					onChangeText={(text) => setText(text)}
					value={text}
				/>
				<TouchableOpacity
					style={styles.searchButton}
					onPress={() => handleSearch()}
				>
					<Feather name="search" size={18} color="black" />
				</TouchableOpacity>
			</View>

			<View>
				{searches && (
					<RNPickerSelect
						onValueChange={(value) => {
							setText(value);
						}}
						onDonePress={() => handleSearch()}
						placeholder={{
							label: 'Search history',
							value: '',
						}}
						items={searches.map((search) => ({
							label: search,
							value: search,
						}))}
						style={{
							placeholder: {
								color: 'black',
							},
							inputIOSContainer: homeStyles.button,
						}}
					/>
				)}
			</View>
		</>
	);
};
export default Search;
const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	input: {
		backgroundColor: COLORS.greyTint,
		padding: 10,
		borderRadius: 10,
		flex: 1,
	},
	searchButton: {
		backgroundColor: COLORS.greyTint,
		padding: 4,
		borderRadius: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
		marginLeft: 10,
		aspectRatio: 1,
		height: 40,
	},
});
