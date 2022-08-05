import { StyleSheet } from 'react-native';
import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: theme.colors.white,
		paddingBottom: 6,
	},

	content: {
		paddingTop: 32,
		paddingBottom: 10,
		paddingHorizontal: 32,
		backgroundColor: theme.colors.secondary,
	},

	boxHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	title: {
		fontFamily: theme.fonts.title700,
    	color: theme.colors.white,
    	fontSize: 18,
	},

	// headerTop: {
	// 	flexDirection: 'row', 
	// 	alignItems: 'center',
	// 	justifyContent: 'space-between',
	// 	paddingVertical: 8,
	// 	fontFamily: theme.fonts.text500,
	// },

	// headerBottom: {
	// 	flexDirection: 'row',
	// 	paddingVertical: 8,
	// 	justifyContent: 'space-between',
	// 	alignItems: 'center',
	// },

	// headerBottomRight: {
	// 	alignItems: 'center'
	// },
	
	// shadow: {
    //     shadowColor: '#000',
	// 	shadowOffset: { width: 1, height: 1 },
	// 	shadowOpacity:  0.4,
	// 	shadowRadius: 3,
	// 	elevation: 5,
	// },

	// text: {
	// 	fontFamily: theme.fonts.text500,
	// },

	// size12: {
	// 	fontSize: 12
	// },

	// size14: {
	// 	fontSize: 14
	// },

	// size16: {
	// 	fontSize: 16
	// },

	// size18: {
	// 	fontSize: 18
	// },

	// size24: {
	// 	fontSize: 24
	// },

	// strong: {
	// 	fontWeight: 'bold',
	// 	color: theme.colors.primary
	// },

	// uppercase: {
	// 	textTransform: 'uppercase'
	// },


});
