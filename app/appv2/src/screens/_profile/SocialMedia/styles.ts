import { StyleSheet } from 'react-native';
import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 32,
		justifyContent: 'flex-start',
		backgroundColor: '#fff',
	},

	safeArea: {
		width: '100%'
	},

	scrollView: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%',
		paddingBottom: 100,
	},

	main: {
		width: '100%'
	},
});