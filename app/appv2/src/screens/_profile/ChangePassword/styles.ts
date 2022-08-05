import { StyleSheet } from 'react-native';
import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 32,
		paddingHorizontal: 32,
		backgroundColor: '#fff',
	},

	containerText: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: 'rgba(0,0,0, .035)'
	},

	border: {
		borderTopWidth: 1,
		paddingVertical: 5
	},

	contentText: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
	},
	
	input: {
		backgroundColor: '#fff',
		borderRadius: 8,
		fontFamily: theme.fonts.text400,
		fontSize: 14,
		paddingVertical: 8,
		maxWidth: '80%',
		minWidth: '80%'
	},

	text: {
		fontFamily: theme.fonts.text500,
		fontSize: 12,
		color: theme.colors.textGray
	},

	iconColorPrimary: {
		color: theme.colors.primary,
	},

	iconColorGray: {
		color: theme.colors.textGray
	},

	login: {
		marginTop: 16,
		textAlign: 'center',
		color: theme.colors.text,
	},

	strong: {
		fontFamily: theme.fonts.text500,
		color: theme.colors.primary,
		fontWeight: 'bold'
	},
});