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
		paddingHorizontal: 32,
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

	main: {
		width: '100%',
	},

	cardContainer: {
		margin: 0,
		padding: 16,
		borderRadius: 10,
		marginTop: 16,
		marginHorizontal: 2
	},

	text: {
		fontFamily: theme.fonts.text500,
        color: theme.colors.subTitle
	},

	card: {
		paddingVertical: 8
	},

	row: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	shadow: {
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity:  0.4,
		shadowRadius: 3,
		elevation: 5,
	},

	size12: {
		fontSize: 12
	},

	size16: {
		fontSize: 16
	},

	size18: {
		fontSize: 18
	},

	size20: {
		fontSize: 20
	},

	title: {
		fontFamily: theme.fonts.title700,
	},
	
	bold: {
		color: theme.colors.primary,
	},

	margin8: {
		marginTop: 8
	},

	white: {
		color: theme.colors.white,
		fontWeight: 'bold'
	},

	borderTop: {
		borderTopWidth: 1,
		borderColor: 'rgba(0,0,0, .035)',
	},
});