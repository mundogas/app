import { StyleSheet } from 'react-native';
import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
  	container: {
		position: 'absolute',
    	top: 10,
  	},
	
	content: {
		flex: 1,
    	flexDirection: 'row',
    	alignItems: 'center'
	},

	title: {
		fontFamily: theme.fonts.title700,
    	color: theme.colors.subTitle,
    	fontSize: 18,
    	marginLeft: 20,
	}
});
