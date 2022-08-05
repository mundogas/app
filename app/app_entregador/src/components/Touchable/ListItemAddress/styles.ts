import { StyleSheet } from 'react-native';
import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
	containerText: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: 'rgba(0,0,0, .035)',
		maxWidth: '100%',
		minWidth: '100%',
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
		borderColor: theme.colors.primary,
		borderWidth: 1,
		marginBottom: 10,
		fontFamily: theme.fonts.text400,
		fontSize: 14,
		paddingVertical: 8,
		paddingHorizontal: 16,
		height: 50
	},
	
	title: {
		fontFamily: theme.fonts.text500,
		fontSize: 16,
		color: theme.colors.text
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
});