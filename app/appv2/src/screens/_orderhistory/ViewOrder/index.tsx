import React from 'react';
import { 
	View, 
	Text,  
	SafeAreaView,
	ScrollView,
} from 'react-native';
import { styles } from './styles';

import { Header } from '../../../components/Headers/Header';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../../services/auth';
import { useAxios } from '../../../hooks/useAxios';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/esm/locale/pt/index.js';
import { CreateUser } from '../../../interfaces/interfaces';
import { Button } from '../../../components/Buttons/Button';

export function ViewOrder() {
	/*===============VARIÁVEIS DE CONTROLE ===================*/
	//Params
	const route = useRoute();
	const params = route.params as CreateUser;

	//Auth
	const { user } = useAuth();

	//Endereços do user
	const { data } = useAxios('cliente/historico/' +user?.id);

	//Navigation
	const navigation = useNavigation();

	/*===============FUNÇÕES DE NAVEGAÇÃO ===================*/
	function handleSendFeedback(){
		navigation.navigate('SendFeedback', {data: params.data});
	}

	return (
		<>
			<Header title="Detalhes do pedido" back={true} />

			<View style={styles.container}>
				<SafeAreaView style={styles.safeArea}>
					<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
						<View style={styles.margin24}>
							<Text style={styles.titleOrder}>Pedido #{params.data.id}</Text>
							<Text style={styles.dateOrder}>Realizado às {format(parseISO(params.data.date_hour), "HH:mm - dd'/'MM'/'yy", { locale: pt })}</Text>

							{
								params.data.status === 'Entregue' &&
								<Text style={styles.dateOrder}>Entregue às {format(parseISO(params.data.date_hour_entrega), "HH:mm - dd'/'MM'/'yy", { locale: pt })}</Text>
							}

							<View style={styles.boxStatus}>
								<Text style={styles.textStatus}>{params.data.status}</Text>
								<Icon name="truck" size={16} color="white" />
							</View>

							<View style={[styles.containerItems, styles.margin24, styles.border]}>
								{
									params.data.itens &&
									params.data.itens.map((item: any, i: number) => (
										<View style={styles.boxItems} key={i}>
											<Text style={styles.titleItem}>{item.qtde}x {item.name_produto.name}</Text>
											<Text style={styles.totalItem}>R${item.value}</Text>
										</View>
									))
								}
							</View>

							<View style={[styles.containerItems, styles.boxItems, styles.borderBottom]}>
								<Text style={styles.titlePrice}>Total: </Text>
								<Text style={styles.totalPrice}>R${params.data.total}</Text>
							</View>

							<View style={[styles.borderBottom, styles.containerItems]}>
								<Text style={styles.titleItem}>Pagamento</Text>
								{params.data.platform_payment === 'app' ?
									<Text style={styles.titlePrice}>No {params.data.payment_method}, pelo {params.data.platform_payment}</Text>
									:
									<Text style={styles.titlePrice}>No {params.data.payment_method}, na {params.data.platform_payment}</Text>
								}
							</View>
							
							{	
								params.data.entregador &&
								<View style={[styles.borderBottom, styles.containerItems]}>
									<Text style={styles.titleItem}>Entregue por</Text>
									<Text style={styles.titlePrice}>{params.data.entregador.name}</Text>
								</View>
							}

							{
								params.data.feedback &&
								<View style={styles.containerItems}>
									<Text style={styles.titleItem}>Feedback</Text>

									<View style={styles.boxStar}>
										<Icon name="star" color="#F0831C"/>
										<Text style={styles.titleItem}>{params.data.feedback.stars}</Text>	
									</View>

									<Text style={styles.totalItem}>{params.data.feedback.obs}</Text>
								</View>
							}
							
							{
								!params.data.feedback && params.data.status === 'Entregue' &&
								<View style={styles.margin24}>
									<Button
									title="Enviar Feedback"
									color="primary"
									enabled={true}
									onPress={() => handleSendFeedback()}
									/>
								</View>
							}
							
						</View>
					</ScrollView>
				</SafeAreaView>
			</View>
		</>
	);
}
