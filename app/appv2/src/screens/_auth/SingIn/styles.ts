import { StyleSheet } from 'react-native';

import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#fff', 
  },

  content: { 
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },

  containerText: {
	  justifyContent: 'space-between',
	},

  contentText: {
    flexDirection: 'column',
  },

  form: {
    marginTop: 16,
  },

  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
    fontFamily: theme.fonts.text400,
    fontSize: 14,
    paddingVertical: 8,
    //paddingHorizontal: 16,
    height: 50,
    minWidth: '100%',
    maxWidth: '100%',
    borderBottomWidth: 1,
    borderColor: 'rgba(239,118,29, .35)',
  },

  text: {
    fontFamily: theme.fonts.text500,
    fontSize: 14,
    color: theme.colors.text
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

  iconColorPrimary: {
		color: theme.colors.primary,
	},

	iconColorGray: {
		color: theme.colors.textGray
	},

});