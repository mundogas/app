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

    text: {
		fontFamily: theme.fonts.text500,
		color: theme.colors.subTitle
	},

    margin8: {
		marginTop: 8
	},
	
	margin16: {
		marginTop: 16
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
