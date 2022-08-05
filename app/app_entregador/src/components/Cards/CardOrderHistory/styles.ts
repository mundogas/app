import { StyleSheet } from 'react-native';
import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
	cardContainer: {
		margin: 0,
		flexDirection: 'column', 
		justifyContent: 'space-between',
		backgroundColor: 'white',
		padding: 16,
		borderRadius: 10,
		marginTop: 16,
		marginHorizontal: 2
	},

	cardContent: {
		flex: 1, 
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end'
	},

	text: {
		fontFamily: theme.fonts.text500,
		color: theme.colors.subTitle,
	},

	size12: {
		fontSize: 12
	},

	size14: {
		fontSize: 14
	},

	size16: {
		fontSize: 16
	},

	strong: {
		fontWeight: 'bold',
		color: theme.colors.primary
	},

	bold: {
		fontFamily: theme.fonts.title700,
	},

	uppercase: {
		textTransform: 'uppercase'
	},

	margin8: {
		marginTop: 8
	},
		
	boxStatus: {
		backgroundColor: theme.colors.secondary,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		paddingVertical: 5,
		paddingHorizontal: 5 
	},

	white: {
		color: theme.colors.white,
		fontWeight: 'bold'
	},

	shadow: {
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity:  0.4,
		shadowRadius: 3,
		elevation: 5,
	}
});