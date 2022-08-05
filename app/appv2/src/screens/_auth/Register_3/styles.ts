import { StyleSheet } from 'react-native';

import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 32
  },

  form: {
    marginTop: 16
  },

  input: {
		backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'rgba(239,118,29, .35)',
		fontFamily: theme.fonts.text400,
		fontSize: 14,
		paddingVertical: 8,
		maxWidth: '100%',
		minWidth: '100%'
	},

  input30: {
    width: '30%'
  },

  input60: {
    width: '65%',
    marginLeft: '5%'
  },

  text: {
		fontFamily: theme.fonts.text500,
		fontSize: 12,
		color: theme.colors.textGray
	},

  warning: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },

  strong: {
    fontFamily: theme.fonts.text500,
    color: theme.colors.primary,
    fontSize: 14,
  },

  footer: {
    marginTop: 32
  },

	iconColorPrimary: {
		color: theme.colors.primary,
	},

	iconColorGray: {
		color: theme.colors.textGray
	},

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
});