import { StyleSheet } from 'react-native';

import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  textContent: {
    marginTop: 32
  },

  title: {
    fontFamily: theme.fonts.title800,
    color: theme.colors.title,
    fontSize: 32
  },

  text: {
    fontFamily: theme.fonts.text400,
    color: theme.colors.text,
    lineHeight: 20
  },

  main: {
		justifyContent: 'center',
    alignItems: 'center',
	},

  image: {
    width: 200,
    height: 200,
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