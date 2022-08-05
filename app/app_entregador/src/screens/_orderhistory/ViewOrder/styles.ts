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
	
	margin18: {
		marginTop: 18,
	},

	containerItems: {
		paddingVertical: 10
	},

	boxItems: { 
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8
	},

	titleOrder: {
		fontSize: 18,
		fontFamily: theme.fonts.text500,
		color: theme.colors.subTitle
	},

	dateOrder: {
		fontSize: 12,
		color: theme.colors.subTitle
	},

	titleItem: {
		fontSize: 14,
		fontFamily: theme.fonts.text400,
		color: theme.colors.subTitle
	},

	totalItem: {
		fontFamily: theme.fonts.text500,
		color: theme.colors.subTitle
	},

	boxStatus: {
		backgroundColor: 'rgba(27, 150, 145, .65)',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		paddingVertical: 8,
		minWidth: '100%',
		maxWidth: '100%',
		marginTop: 8
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

	titlePrice: {
		fontSize: 16,
		fontFamily: theme.fonts.text500,
		color: theme.colors.subTitle
	},

	totalPrice: {
		fontSize: 16,
		fontFamily: theme.fonts.title700,
		color: theme.colors.subTitle
	},

	boxStar: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 3
	}

});