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

import { useAuth } from '../../services/auth';
import { useAxios } from '../../hooks/useAxios';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/esm/locale/pt/index.js';
import { OrderHistoryContext } from '../../contexts/OrderHistoryContext';

export function OrderHistory({navigation}: any) {
	/*===============VARIÁVEIS DE CONTROLE ===================*/
	//Auth
	const { user } = useAuth();

	const { data }: any = useContext(OrderHistoryContext);

	//Endereços do user
	//const { data }: any = useAxios('entregador/entregues/' +user?.id);

	/*===============FUNÇÕES DE NAVEGAÇÃO ===================*/
	function handleNavigateToViewOrder(order: any){
		navigation.navigate('ViewOrder', {data: order});
	}

	return (
		<>
			<Header title="Histórico de entregas" back={false} />

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
