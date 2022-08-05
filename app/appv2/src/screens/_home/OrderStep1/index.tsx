import React, { useContext } from 'react';
import { 
	View, 
	Text,  
	SafeAreaView,
	ScrollView,
} from 'react-native';
import { styles } from './styles';
import { Header } from '../../../components/Headers/Header';
import { Button } from '../../../components/Buttons/Button';
import { CardOrderStep1 } from '../../../components/Cards/CardOrderStep1';
import { Input } from '../../../components/Inputs/Input';

import { OrderContext } from '../../../contexts/OrderContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CreateUser } from '../../../interfaces/interfaces';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export function OrderStep1() {
	/*===============VARIÁVEIS DE CONTROLE ===================*/
	//Params
	const route = useRoute();
	const params = route.params as CreateUser;

	const { endereco, enabled1, dicas, setDicas }: any = useContext(OrderContext);

	//Navigation
	const navigation = useNavigation();

	/*===============FUNÇÕES DE NAVEGAÇÃO ===================*/
	function handleNavigateToOrderStep2(){
		navigation.navigate('OrderStep2', {data: params.data});
	}

	return (
		<>
			<Header title="Pedido" back={true} />

			<View style={styles.container}>
				<SafeAreaView style={styles.safeArea}>
					<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
						<KeyboardAwareScrollView style={[styles.main, styles.margin18]}>
							<CardOrderStep1
								title={params.data.name}
								weight={params.data.peso}
								price={params.data.preco}
							/>

							<View style={styles.margin18}>
								<Text style={styles.title}>Entregar em:</Text>
								<Text style={styles.subTitle}>{endereco.address}, {endereco.number}</Text>
								<Text style={styles.p}>{endereco.district}, {endereco.cidade.cidade_name.name}</Text>
							</View>

							<View style={styles.margin18}>
								<Input
									title="Dicas para o entregador (opcional)"
									placeholder="Casa do fundo, de esquina, etc.."
									width="100"
									value={dicas}
									autoCorrect={false}
									onChangeText={setDicas}
								/>
							</View>
							
							<View style={styles.margin18}>
								<Button
									title="Prosseguir"
									enabled={enabled1}
									color="primary"
									onPress={() => handleNavigateToOrderStep2()}
								/>
							</View>
						</KeyboardAwareScrollView>
					</ScrollView>
				</SafeAreaView>
			</View>
		</>
	);
}
