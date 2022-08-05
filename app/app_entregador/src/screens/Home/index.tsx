import React, { useContext, useEffect, useState } from 'react';
import { 
	View, 
	Text,  
	SafeAreaView,
	ScrollView,
	ActivityIndicator,
	TouchableOpacity
} from 'react-native';
import { styles } from './styles';
import { Header } from '../../components/Headers/Header';

import { OrderDeliveryContext } from '../../contexts/OrderDeliveryContext';

export function Home({navigation}: any) {
	/*===============VARIÁVEIS DE CONTROLE ===================*/
	const { data }: any = useContext(OrderDeliveryContext);
	
	/*===============FUNÇÕES DE NAVEGAÇÃO ===================*/
    function handleNavigateToOrderStep1(item: any) {
        navigation.navigate('OrderStep1', {data: item});
    }

	if(!data){
		return (
			<View style={styles.containerNull}>
				<Text style={[styles.warning, {textAlign: 'center'}]}>Carregando as informações</Text>
          		<ActivityIndicator style={{marginTop: 10}} color="#F0831C" />
			</View>
		)
	}

	if(data.length <= 0){
		return (
			<>
				<Header title="Pedidos" back={false} />

				<View style={styles.containerNull}>
					<Text style={[styles.warning, {textAlign: 'center'}]}>Sem pedidos no momento...</Text>
				</View>
			</>
		)
	}

	return (
		<>
			<Header title="Pedidos" back={false} />

			<View style={styles.container}>
				<SafeAreaView style={styles.safeArea}>
					<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
						<View style={styles.main}>
							{
								data?.map((item: any, i: number) => (
									<TouchableOpacity 
										key={String(i)} 
										style={[styles.cardContainer, styles.shadow]}
										activeOpacity={.5}
										onPress={() => handleNavigateToOrderStep1(item)}
									>
										<View>
											<Text style={[styles.title, styles.size18, styles.bold]}>{item.cliente.name}</Text>
										</View>

										<View style={[styles.card]}>
											<Text style={styles.text}>{item.endereco.address}, {item.endereco.number}</Text>
											<Text style={styles.text}>{item.endereco.district} - {item.endereco.cidade.cidade_name.name}</Text>
										</View>

										<View style={[styles.borderTop, styles.card, styles.row]}>
											<Text style={styles.text}>Total</Text>
											<Text style={[styles.text, styles.bold]}>R${item.total}</Text>
										</View>
									</TouchableOpacity>
								))
							}
						</View>
					</ScrollView>
				</SafeAreaView>
			</View>
		</>
	);
}
