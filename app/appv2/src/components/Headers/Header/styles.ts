import { StyleSheet } from 'react-native';
import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.white,
		position: 'relative',
		zIndex: 99,
	},

	content: {
		backgroundColor: theme.colors.secondary,
		borderBottomEndRadius: 30,
		borderBottomStartRadius: 30,
		paddingTop: 50,
		paddingHorizontal: 32,
		paddingBottom: 20,
		flexDirection: 'row'
	},

	title: {
		fontFamily: theme.fonts.title700,
    	color: theme.colors.white,
    	fontSize: 18,
	},

	contentBack: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	
	icon: {
		color: theme.colors.white,
		marginRight: 10
	},
});
