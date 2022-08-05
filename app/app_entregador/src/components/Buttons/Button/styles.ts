import { StyleSheet } from 'react-native';
import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  
  primary: {
    backgroundColor: theme.colors.primary,
  },

  disabledPrimary: {
    backgroundColor: theme.colors.primary,
    opacity: .5
  },

  red: {
    backgroundColor: '#f44'
  },

  disabledRed: {
    backgroundColor: 'red',
    opacity: .5
  },

  title: {
    flex: 1,
    color: theme.colors.white,
    fontFamily: theme.fonts.title700,
    fontSize: 15,
    textAlign: 'center',
  },
});
