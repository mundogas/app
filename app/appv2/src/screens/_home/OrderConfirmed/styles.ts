import { StyleSheet } from 'react-native';
import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 32,
		justifyContent: 'flex-start',
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
	
	main: {
		width: '100%',
	},

	title: {
		fontFamily: theme.fonts.title800,
		color: theme.colors.title,
		fontSize: 32,
		marginTop: 8
	},
	
	text: {
		fontFamily: theme.fonts.text400,
		color: theme.colors.text,
		lineHeight: 20,
		marginTop: 8
	},

	contentImage: {
		justifyContent: 'center',
		alignItems: 'center',
	},

	image: {
		width: 180,
		height: 180,
	},
});