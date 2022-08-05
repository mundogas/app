import { StyleSheet } from 'react-native';

import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 32,
  },

  content: { 
    flex: 1,
    justifyContent: 'space-between',   
    padding: 32,
  },

  safeArea: {
		width: '100%',
    height: '100%', 
	},

  scrollView: {
		display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
	},

  form: {
    marginTop: 16
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    marginBottom: 10,
    fontFamily: theme.fonts.text400,
    fontSize: 14,
  },

  TextTrackList: {
    fontFamily: theme.fonts.text500,
    fontSize: 14,
    color: theme.colors.text
  },

  text: {
		fontFamily: theme.fonts.text500,
		fontSize: 13,
		color: theme.colors.textGray
	},

  warning: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});