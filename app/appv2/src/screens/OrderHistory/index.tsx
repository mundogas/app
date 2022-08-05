import React, { useContext, useEffect, useState } from 'react';
import { 
	View, 
	Text,  
	SafeAreaView,
	ScrollView,
} from 'react-native';
import { styles } from './styles';

import { Header } from '../../components/Headers/Header';
import { CardOrderHistory } from '../../components/Cards/CardOrderHistory';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../services/auth';
import { useAxios } from '../../hooks/useAxios';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/esm/locale/pt/index.js';
import { OrderContext } from '../../contexts/OrderContext';

export function OrderHistory({navigation}: any) {
	/*===============VARIÁVEIS DE CONTROLE ===================*/
	const { data }: any = useContext(OrderContext);
	//console.log(data.length);
	//Navigation
	//const navigation = useNavigation();
	console.log(data);
	/*===============FUNÇÕES DE NAVEGAÇÃO ===================*/
	//useEffect(() => {}, [data, navigation]);

	function handleNavigateToViewOrder(order: any){
		navigation.navigate('ViewOrder', {data: order});
	}

	return (
		<>
			<Header title="Histórico de pedidos" back={false} />

			<View style={styles.container}>
				<SafeAreaView style={styles.safeArea}>
					<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
						<View style={styles.main}>
							{	
								data &&
								data?.map((order: any, i: number) => (
									<CardOrderHistory
										title={i + 1}
										key={String(i)}
										status={order.status}
										date={format(parseISO(order.date_hour), "dd'/'MM'/'yy", { locale: pt })}
										platform_payment={order.platform_payment}
										payment_method={order.payment_method}
										price={order.total}
										onPress={() => handleNavigateToViewOrder(order)}
									/>
								))
							}
						</View>
					</ScrollView>
				</SafeAreaView>
			</View>
		</>
	);
}
