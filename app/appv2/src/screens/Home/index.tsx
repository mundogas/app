import React, { useContext, useEffect, useState } from 'react';
import { 
	View, 
	Text,  
	SafeAreaView,
	ScrollView,
	ActivityIndicator
} from 'react-native';
import { Select, CheckIcon } from 'native-base';
import { styles } from './styles';
import { ContentItemsShop } from '../../components/Content/ContentItemsShop';
import { Feather as Icon } from '@expo/vector-icons';

import { useAuth } from '../../services/auth';
import { useAxios } from '../../hooks/useAxios';
import { OrderContext } from '../../contexts/OrderContext';

export function Home({navigation}: any) {
	/*===============VARIÁVEIS DE CONTROLE ===================*/
	//Auth
	const { user } = useAuth();

	//Endereços do user
	const { data }: any = useAxios('cliente/meus-enderecos/' +user?.id);
	
	const { cidadeID, select, handleCidadeID, handleData }: any = useContext(OrderContext);

	/*===============FUNÇÕES DE NAVEGAÇÃO ===================*/

	/*===============FUNÇÕES DE DADOS ===================*/
	useEffect(() => {
		handleData(data);
	}, [navigation, data]);

	if(!data || !cidadeID){
		return (
			<View style={styles.containerNull}>
				<Text style={[styles.warning, {textAlign: 'center'}]}>Carregando as informações</Text>
          		<ActivityIndicator style={{marginTop: 10}} color="#F0831C" />
			</View>
		)
	}

	return (
		<>
			<View style={styles.bg}>
				<View style={styles.contentSelect}>
					<Select
						selectedValue={select}
						height="50"
						borderWidth="0"
						fontSize="16"
						color="white"
						dropdownIcon={<Icon name="arrow-down" color="white" size={15} />}
						fontFamily="Poppins_700Bold"
						placeholder="Endereço"
						placeholderTextColor="white"
						_selectedItem={{
							bgColor: "rgba(239, 118, 29, 0.25)",
							leftIcon: <CheckIcon size="3" />,
						}}
						_item={{
							bgColor: '#fff',
						}}
						onValueChange={(itemValue) => handleCidadeID(itemValue, data)}
					>
						{
							data?.map((item: any) => (
								<Select.Item 
									key={String(item.id)}
									label={String([item.address, item.number])} 
									value={item.id}
								/>
							))
						}
					</Select>
				</View>
			</View>

			<View style={styles.container}>
				<SafeAreaView style={styles.safeArea}>
					<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
						<ContentItemsShop
							id={cidadeID}
						/>
					</ScrollView>
				</SafeAreaView>
			</View>
		</>
	);
}
