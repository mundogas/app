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
	
	margin24: {
		marginTop: 18,
	},

	text: {
        fontFamily: theme.fonts.text400,
        fontSize: 14,
        color: theme.colors.text
    },

	textStatus: {
		color: theme.colors.white,
		fontWeight: 'bold',
		marginRight: 10
	},

	border: {
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderColor: 'rgba(0,0,0, .035)',
	},

	borderBottom: {
		borderBottomWidth: 1,
		borderColor: 'rgba(0,0,0, .035)',
	},

	textStyle: {
		textAlign: 'center',
		fontSize: 22,
		marginTop: 8,
		marginBottom: 8,
		fontFamily: theme.fonts.text500,
		color: theme.colors.title,
	},
	
	ratingBarStyle: {
		justifyContent: 'center',
		flexDirection: 'row',
		marginTop: 12,
	},

	icon: {
		color: theme.colors.primary
	}
});