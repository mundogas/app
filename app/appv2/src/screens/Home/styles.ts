import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 32,
		justifyContent: 'flex-start',
		backgroundColor: '#fff',
	},

	containerNull: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},

	safeArea: {
		width: '100%'
	},

	scrollView: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%',
		paddingBottom: 30,
	},

	contentSelect: {
		width: '100%'
	},

	bg: {
		paddingTop: 32,
		paddingHorizontal: 32,
		backgroundColor: theme.colors.secondary,
	},

	warning: {
		fontFamily: theme.fonts.title700,
		color: theme.colors.primary,
		fontWeight: 'bold',
		fontSize: 16,
	  },
});