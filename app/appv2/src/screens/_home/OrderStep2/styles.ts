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

	margin18: {
		marginTop: 18,
	},

	title: {
		fontSize: 16,
		fontFamily: theme.fonts.title700,
		color: theme.colors.primary
	},

	subTitle: {
		fontSize: 16,
		fontFamily: theme.fonts.text500,
		color: theme.colors.subTitle
	},

	p: {
		fontSize: 14,
		fontFamily: theme.fonts.text500,
		color: theme.colors.textGray
	},

	checkbox: {
		backgroundColor: theme.colors.white,
		borderRadius: 10,
		marginLeft: 2,
		marginRight: 2,

	},

	checkBoxText:{
		fontFamily: theme.fonts.text500,
		fontSize: 16
	},

	shadow: {
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity:  0.25,
		shadowRadius: 3,
		elevation: 1,
	},
});