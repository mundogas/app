import { StyleSheet } from "react-native";
import { theme } from "../../../global/styles/theme";

export const styles = StyleSheet.create({
    main: {
		width: '100%',
	},

	cardContainer: {
		margin: 0,
		flexDirection: 'row', 
		justifyContent: 'space-between',
		backgroundColor: 'white',
		padding: 16,
		borderRadius: 10,
		marginTop: 16,
		marginHorizontal: 2
	},

	cardContent70: {
		flex: 7,
	},

	cardContent30: {
		flex: 3,
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
		flexDirection: 'row'
	},

	text: {
		fontFamily: theme.fonts.text500,
        color: theme.colors.subTitle
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
        flexDirection: 'row'
    },

    boxKg: {
		backgroundColor: theme.colors.secondary,
		width: '30%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginTop: 4,
        marginRight: 6,
        padding: 5
	},

	white: {
		color: theme.colors.white,
		fontWeight: 'bold'
	},

	bold: {
		fontFamily: theme.fonts.title700,
		color: theme.colors.primary,
		
	},

    size12: {
		fontSize: 12
	},

	size18: {
		fontSize: 18
	},

	size20: {
		fontSize: 20
	},

    margin8: {
		marginTop: 8
	},
});