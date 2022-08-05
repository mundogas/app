import { StyleSheet } from 'react-native';
import { theme } from '../../../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.white,
	},

	content: {
		backgroundColor: theme.colors.secondary,
		padding: 20,
		borderBottomEndRadius: 30,
		borderBottomStartRadius: 30
	},

	title: {
		fontFamily: theme.fonts.title700,
    	color: theme.colors.white,
    	fontSize: 24,
		marginTop: 16
	},
});
