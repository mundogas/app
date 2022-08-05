import React from 'react';
import { 
	View, 
	ScrollView,  
} from 'react-native';
import { styles } from './styles';
import * as Linking from 'expo-linking';
import { Header } from '../../../components/Headers/Header';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ListItemSocialMedia } from '../../../components/Touchable/ListItemSocialMedia';

export function SocialMedia() {
	/*===============VARIÁVEIS DE CONTROLE ===================*/
	function handleFacebook(){
		Linking.openURL('https://www.facebook.com/MUNDO-do-GAS-109323270674419/');
	}

	function handleInstagram(){
		Linking.openURL('https://www.instagram.com/timoteoedias/');
	}

	return (
		<>
			<Header title="Redes sociais" back={true} />

			<View style={styles.container}>
				<SafeAreaView style={styles.safeArea}>
					<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
						<ListItemSocialMedia
							title="Instagram"
							icon="instagram"
							onPress={() => handleInstagram()}
						/>

						<ListItemSocialMedia
							title="Facebook"
							icon="facebook"
							onPress={() => handleFacebook()}
						/>
					</ScrollView>
				</SafeAreaView>
      		</View>
		</>
	);
}
