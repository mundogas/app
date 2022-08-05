import React, { useContext } from 'react';
import { 
	View, 
	Text,  
	SafeAreaView,
	ActivityIndicator,
} from 'react-native';
import { styles } from './styles';
import { Header } from '../../../components/Headers/Header';
import { Button } from '../../../components/Buttons/Button';
import { CardOrderStep2 } from '../../../components/Cards/CardOrderStep2';

import { OrderContext } from '../../../contexts/OrderContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CreateUser } from '../../../interfaces/interfaces';
import { Input } from '../../../components/Inputs/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export function OrderStep3() {
	/*===============VARIÁVEIS DE CONTROLE ===================*/
	//Params
	const route = useRoute();
	const params = route.params as CreateUser;

	const navigation = useNavigation();

	const { enabled3, setEnabled3, handlePaymentApp, loading, qtde, dicas, peso, CPF, setCPF, metodoPagamento, plataformaPagamento, endereco, handleNewOrder }: any = useContext(OrderContext);

	function validateFormButtonEnable() {
		if(CPF){
			CPF.length >= 11 ? setEnabled3(true) : setEnabled3(false);
		}
	}

	function handleNavigateToOrderPayment(){
		handlePaymentApp(params.data);
	}

	return (
		<>
			<Header title="Confirmação" back={true} />

			<View style={styles.container}>
				<SafeAreaView style={styles.safeArea}>
					{/* showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView} */}
					<KeyboardAwareScrollView>
						<View style={[styles.main, styles.margin18]}>
							<CardOrderStep2
								title={params.data.name}
								weight={peso}
								price={params.data.preco}
								qtde={qtde}
							/>

							<View style={styles.margin18}>
								<Text style={styles.title}>Entregar em:</Text>
								<Text style={styles.subTitle}>{endereco.address}, {endereco.number}</Text>
								<Text style={styles.p}>{endereco.district}, {endereco.cidade.cidade_name.name}</Text>
								
								{dicas &&
									<View style={styles.margin8}>
										<Text style={[styles.p, styles.bold]}>Dicas para o entregador:</Text>
										<Text style={styles.p}>{dicas}</Text>
									</View>
								}
								
							</View>

							<View style={styles.margin18}>
								<Text style={styles.title}>Pagamento</Text>
								{
									plataformaPagamento === 'app' ?
									<Text style={styles.subTitle}>No {metodoPagamento}, pelo {plataformaPagamento}</Text>
									:
									<Text style={styles.subTitle}>No {metodoPagamento}, na {plataformaPagamento}</Text>
								}
							</View>
							
							{
								plataformaPagamento === 'app' &&
								<View style={styles.margin18}>
									<Text style={styles.title}>Para continuar, insira:</Text>
									<Input
									title="CPF"
									placeholder="12345678900"
									width="100"
									value={CPF}
									autoCorrect={false}
									onChangeText={setCPF}
									keyboardType="number-pad"
									onContentSizeChange={validateFormButtonEnable}
								/>
								</View>
							}

							<View style={styles.margin18}>
								{loading && 
									<ActivityIndicator style={{marginTop: 10}} color="#F0831C" /> 
								}

								{
									!loading && plataformaPagamento === 'entrega' &&
									<Button
										title="Confirmar Pedido"
										enabled={true}
										color="primary"
										onPress={() => handleNewOrder(params.data)}
									/>
								}

								{
									!loading && plataformaPagamento === 'app' &&
									<Button
										title="Prosseguir para Pagamento"
										enabled={enabled3}
										color="primary"
										onPress={() => handleNavigateToOrderPayment()}
									/>
								}
							</View>
						</View>
					</KeyboardAwareScrollView>
				</SafeAreaView>
			</View>
		</>
	);
}
