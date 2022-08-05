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
		marginHorizontal: 2,
		position: 'relative',
	},

	contentQtde: {
		backgroundColor: theme.colors.primary,
		position: 'absolute',
		width: 35,
		height: 35,
		justifyContent: 'center',
		top: -20,
		left: 0,
		borderRadius: 100
	},

	textQtde: {
		textAlign: 'center',
		color: theme.colors.white,
		fontSize: 14,
		fontFamily: theme.fonts.title700
	},

	cardContent70: {
		flex: 5,
	},

	cardContent30: {
		flex: 5,
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
		flexDirection: 'row'
	},

    shadow: {
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity:  0.4,
		shadowRadius: 3,
		elevation: 5,
	},

	contentBoxKg: {
        flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
    },

    boxKg: {
		width: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginLeft: 8,
		padding: 5
	},

	bgSecondary: {
		backgroundColor: theme.colors.secondary,
	},

	bgGray: {
		backgroundColor: theme.colors.gray
	},

	size20: {
		fontSize: 20
	},

	white: {
		color: theme.colors.white,
		fontWeight: 'bold'
	},

    bold: {
		fontFamily: theme.fonts.title700,
		color: theme.colors.primary,
	},

    title: {
		fontFamily: theme.fonts.text500,
		color: theme.colors.subTitle,
		fontSize: 18,
	},

	subTitle: {
		fontFamily: theme.fonts.text500,
		color: theme.colors.textGray,
	},

	p: {
		fontFamily: theme.fonts.text500,
		color: theme.colors.subTitle,
		fontSize: 12
	},

    margin8: {
		marginTop: 8
	},
	
	margin16: {
		marginTop: 16
	},

	contentInputQtde: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	input: {
		backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'rgba(239,118,29, .35)',
		fontFamily: theme.fonts.text400,
		fontSize: 14,
		paddingVertical: 8,
		width: '20%',
		minWidth: '20%',
		height: 30,
		borderRadius: 8,
		textAlign: 'center'
	},

	icon: {
		color: theme.colors.primary,
		fontSize: 22,
		marginHorizontal: 5
	}
});
