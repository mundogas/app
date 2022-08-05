import React from 'react';
import { 
	View, 
	Text,  
	SafeAreaView,
	ScrollView,
	Image,
} from 'react-native';
import { styles } from './styles';

import { Header } from '../../../components/Headers/Header';
import { Button } from '../../../components/Buttons/Button';
import { CommonActions, useNavigation } from '@react-navigation/native';

export function OrderConfirmed() {
	const navigation = useNavigation();

	function handleNavigateToOrderHistory(){
		//Reseta a pilha
		navigation.reset({
            index: 0,
			routes: [{name: 'Home'}],
        });

		//Encaminha pro histórico
		navigation.navigate('Histórico', {
			screen: 'OrderHistory',
		});
	}

	return (
		<>
			<Header title="Pedido confirmado" back={true} />

			<View style={styles.container}>
				<SafeAreaView style={styles.safeArea}>
					<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
						<View style={styles.main}>

							<View>
								<Text style={styles.title}>Tudo certo!</Text>

								<Text style={styles.text}>
									O seu pedido foi confirmado e em breve estará à caminho. 
								</Text>

								<Text style={styles.text}>
									Para acompanhar, vá até a aba 'Histórico' e clique no pedido realizado.
								</Text>
							</View>

							<View style={styles.contentImage}>
								<Image style={styles.image}
								source={require('../../../assets/ilustracao/ilustracao1.png')} 
								/>
							</View>
							
							<Button
								title="Acompanhar Pedido"
								enabled={true}
								color="primary"
								onPress={() => handleNavigateToOrderHistory()}
							/>
						</View>
					</ScrollView>
				</SafeAreaView>
			</View>
		</>
	);
}
