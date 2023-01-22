import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CharacterProps } from '../@types/characters';
import BonusScreen from '../screens/BonusScreen';
import CharacterScreen from '../screens/CharacterScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParamList = {
	home: undefined;
	character: { character: CharacterProps } | undefined;
	bonus: undefined;
};

const Stack = createNativeStackNavigator();

export default function NavigationStack() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="home" component={HomeScreen} />
				<Stack.Screen name="character" component={CharacterScreen} />
				<Stack.Screen name="bonus" component={BonusScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
