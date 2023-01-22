import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const Container = ({ children, ...rest }: any) => {
	return (
		<ScrollView contentInsetAdjustmentBehavior="automatic">
			<View style={styles.container} {...rest}>
				<SafeAreaView>{children}</SafeAreaView>
			</View>
		</ScrollView>
	);
};
export default Container;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 32,
		marginVertical: 32,
	},
});
