import { StyleSheet } from 'react-native';

import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 32,
    paddingHorizontal: 32
  },

  content: { 
    flex: 1,
    justifyContent: 'space-between',
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

  textCidade: {
    fontFamily: theme.fonts.text500,
    fontSize: 16,
    color: theme.colors.text
  },

  text: {
    fontFamily: theme.fonts.text400,
    fontSize: 14,
    color: theme.colors.text
  },

  strong: {
    fontFamily: theme.fonts.text500,
    color: theme.colors.primary,
    fontWeight: 'bold'
  },

  footer: {
    position: 'relative',
    bottom: 0
  }
});