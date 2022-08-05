import { StyleSheet } from 'react-native';
import { theme } from '../../../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.white,
		position: 'relative',
		zIndex: 99
	},

	content: {
		backgroundColor: theme.colors.secondary,
		borderBottomEndRadius: 30,
		borderBottomStartRadius: 30,
		padding: 20,
	},

	title: {
		fontFamily: theme.fonts.title700,
    	color: theme.colors.white,
    	fontSize: 24,
		marginTop: 16
	},
});
