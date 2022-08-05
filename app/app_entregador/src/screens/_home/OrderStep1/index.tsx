import React, { useContext, useEffect, useState } from 'react';
import { 
	View, 
	Text,  
	SafeAreaView,
	ScrollView,
	ActivityIndicator
} from 'react-native';
import { styles } from './styles';
import { Header } from '../../../components/Headers/Header';
import { Button } from '../../../components/Buttons/Button';
import { FontAwesome as Icon } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Data } from '../../../interfaces/interfaces';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/esm/locale/pt/index.js';
import { OrderDeliveryContext } from '../../../contexts/OrderDeliveryContext';

export function OrderStep1() {
	/*===============VARIÁVEIS DE CONTROLE ===================*/
	//Params
	const route = useRoute();
	const params = route.params as Data;

	//Navigation
	const navigation = useNavigation();

	const { loading, handleStatusCaminho, handleDataStep1 }: any = useContext(OrderDeliveryContext);
	const dados = handleDataStep1(params.data.id);
	
	/*===============FUNÇÕES DE NAVEGAÇÃO ===================*/
	function handleNavigateToOrderStep2(){
		navigation.navigate('OrderStep2', {data: params.data});
	}

	if(!dados || dados.length){
		return (
			<>
				<Header title="Pedido" back={true} />

				<View style={styles.containerNull}>
					<Text style={[styles.warning, {textAlign: 'center'}]}>Carregando as informações</Text>
					<ActivityIndicator style={{marginTop: 10}} color="#F0831C" />
				</View>
			</>
		)
	}

	return (
		<>
			<Header title="Pedido" back={true} />

			<View style={styles.container}>
				<SafeAreaView style={styles.safeArea}>
					<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
						<KeyboardAwareScrollView style={[styles.main, styles.margin18]}>
							<View style={styles.margin18}>
								<Text style={styles.titleOrder}>Pedido #{dados.id}</Text>
								<Text style={styles.dateOrder}>Realizado às {format(parseISO(dados.date_hour), "HH:mm - dd'/'MM'/'yy", { locale: pt })}</Text>

								<View style={styles.boxStatus}>
									<Text style={styles.textStatus}>{dados.status}</Text>
									<Icon name="truck" size={16} color="white" />
								</View> 

								<View style={[styles.containerItems, styles.margin18, styles.border]}>
									{
										dados.itens &&
										dados.itens.map((item: any, i: number) => (
											<View style={styles.boxItems} key={i}>
												<Text style={styles.titleItem}>{item.qtde}x {item.name_produto.name}</Text>
												<Text style={styles.totalItem}>R${item.value}</Text>
											</View>
										))
									}
								</View>

								<View style={[styles.containerItems, styles.boxItems, styles.borderBottom]}>
									<Text style={styles.titlePrice}>Total: </Text>
									<Text style={styles.totalPrice}>R${dados.total}</Text>
								</View>

								<View style={[styles.borderBottom, styles.containerItems]}>
									<Text style={styles.titleItem}>Pagamento</Text>
									{dados.platform_payment === 'app' ?
										<Text style={styles.titlePrice}>No {dados.payment_method}, pelo {dados.platform_payment}</Text>
										:
										<Text style={styles.titlePrice}>No {dados.payment_method}, na {dados.platform_payment}</Text>
									}
								</View>
							</View>
							
							<View style={styles.margin18}>
								{
									loading ?
										<ActivityIndicator style={{marginTop: 10}} color="#F0831C" /> 
									:
									!loading && dados.status === 'Em processamento' ?
									<Button
										title="Estou à caminho"
										enabled={true}
										color="primary"
										onPress={() => handleStatusCaminho(dados)}
									/>
									:
									!loading && dados.status === 'À caminho' ?
									<Button
										title="Prosseguir"
										enabled={true}
										color="primary"
										onPress={() => handleNavigateToOrderStep2()}
									/>
									:
									<></>
								}
							</View>
						</KeyboardAwareScrollView>
					</ScrollView>
				</SafeAreaView>
			</View>
		</>
	);
}
