import React, { useContext } from 'react';
import { 
	View, 
	Text,  
	SafeAreaView,
	ScrollView,
	Image,
	ActivityIndicator
} from 'react-native';
import { styles } from './styles';
import { Header } from '../../../components/Headers/Header';
import { Button } from '../../../components/Buttons/Button';

import { Data } from '../../../interfaces/interfaces';
import { OrderDeliveryContext } from '../../../contexts/OrderDeliveryContext';
import { useRoute } from '@react-navigation/native';

export function OrderStep2() {
	/*===============VARIÁVEIS DE CONTROLE ===================*/
	//Params
	const route = useRoute();
	const params = route.params as Data;

	const { loading, handlePedidoEntregue }: any = useContext(OrderDeliveryContext);

	return (
		<>
			<Header title="Confirmar entrega" back={true} />

			<View style={styles.container}>
				<SafeAreaView style={styles.safeArea}>
					<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
						<View style={[styles.main, styles.margin18]}>
							<View style={styles.margin18}>
								<Text style={[styles.title, styles.fontSize20]}>Opaa!</Text>
							</View>

							<View style={styles.margin8}>
								{
									params.data.platform_payment === 'entrega' ?
									<Text style={styles.subTitle}>Confirma o recebimento do valor do pedido na entrega?</Text>
									:
									<Text style={styles.subTitle}>Deu tudo certo na entrega?</Text>
								}	
							</View>

							<View style={[styles.contentImage, styles.margin8]}>
								<Image style={styles.image}
								source={require('../../../assets/ilustracao/ilustracao1.png')} 
								/>
							</View>

							<View style={styles.margin18}>
								{loading ?
									<ActivityIndicator style={{marginTop: 10}} color="#F0831C" />
									:
									<Button
										title="Confirmar Entrega"
										enabled={true}
										color="primary"
										onPress={() => handlePedidoEntregue(params.data)}
									/>
								}
							</View>
						</View>
					</ScrollView>
				</SafeAreaView>
			</View>
		</>
	);
}
