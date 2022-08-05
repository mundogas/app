import { StyleSheet } from 'react-native';

import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
    containerText: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

    contentText: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
	},

    text: {
        fontFamily: theme.fonts.text400,
        fontSize: 14,
        color: theme.colors.text
    },

    input: {
		backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: 'rgba(239,118,29, .35)',
		fontFamily: theme.fonts.text400,
		fontSize: 14,
		paddingVertical: 8,
		maxWidth: '100%',
		minWidth: '100%',
        height: 80
	},
});