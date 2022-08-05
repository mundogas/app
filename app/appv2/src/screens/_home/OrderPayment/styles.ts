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
		justifyContent: 'center',
		alignItems: 'center',
	},

	title: {
		fontFamily: theme.fonts.title800,
		color: theme.colors.subTitle,
		fontSize: 32,
		marginTop: 8,
		textAlign: 'center'
	},

	contentImage: {
		justifyContent: 'center',
		alignItems: 'center',
	},

	image: {
		width: 250,
		height: 250,
	},

	imageSick: {
		width: 80,
		height: 80,
	},

	margin8: {
		marginTop: 8,
	},

	margin18: {
		marginTop: 18,
	},

	marginBottom18: {
		marginBottom: 18,
	},

	bgTitle: {
		width: '100%',
		borderRadius: 8,
		justifyContent: 'center',
	},

	bgExpired: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		minHeight: '100%',
	},

	expired: {
		fontFamily: theme.fonts.text500,
		color: theme.colors.subTitle,
		fontSize: 16,
		textAlign: 'center',
	},
});