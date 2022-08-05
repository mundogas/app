import React, { useContext, useEffect, useState } from 'react';
import { 
	View, 
	Text,  
	SafeAreaView,
	ScrollView,
} from 'react-native';
import { styles } from './styles';

import { Header } from '../../../components/Headers/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../../services/auth';
import { useAxios } from '../../../hooks/useAxios';
import { CreateUser } from '../../../interfaces/interfaces';
import { Button } from '../../../components/Buttons/Button';
import { CardOrderStep2 } from '../../../components/Cards/CardOrderStep2';
import { OrderContext } from '../../../contexts/OrderContext';
import { CheckBox, Icon } from 'react-native-elements';

export function OrderStep2() {
	/*===============VARIÁVEIS DE CONTROLE ===================*/
	//Params
	const route = useRoute();
	const params = route.params as CreateUser;

	const { qtde, peso, setMetodoPagamento, setPlataformaPagamento, enabled2, setEnabled2}: any = useContext(OrderContext);

	const [credito, setCredito] = useState(false);
	const [debito, setDebito] = useState(false);
	const [dinheiro, setDinheiro] = useState(false);
	const [picPay, setPicPay] = useState(false);

	//Navigation
	const navigation = useNavigation();

	/*===============FUNÇÕES DE NAVEGAÇÃO ===================*/
	function handleNavigateToOrderStep3(){
		navigation.navigate('OrderStep3', {data: params.data});
	}

	function handleSelectPayment(check: string){
		if(check === 'credito'){
			setCredito(true);
			setDebito(false);
			setDinheiro(false);
			setPicPay(false);
			setMetodoPagamento('crédito');
			setPlataformaPagamento('entrega');
		}
		else if(check === 'debito') {
			setCredito(false);
			setDebito(true);
			setDinheiro(false);
			setPicPay(false);
			setMetodoPagamento('débito');
			setPlataformaPagamento('entrega');
		}
		else if (check === 'dinheiro'){
			setCredito(false);
			setDebito(false);
			setDinheiro(true);
			setPicPay(false);
			setMetodoPagamento('dinheiro');
			setPlataformaPagamento('entrega');
		}
		else {
			setCredito(false);
			setDebito(false);
			setDinheiro(false);
			setPicPay(true);
			setMetodoPagamento('PicPay');
			setPlataformaPagamento('app');
		}

		setEnabled2(true);
	}

	return (
		<>
			<Header title="Pagamento" back={true} />

			<View style={styles.container}>
				<SafeAreaView style={styles.safeArea}>
					<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
						<View style={[styles.main, styles.margin18]}>
							<CardOrderStep2
								title={params.data.name}
								weight={peso}
								price={params.data.preco}
								qtde={qtde}
							/>

							<View style={styles.margin18}>
								<Text style={styles.title}>Pague na entrega:</Text>
								
								<CheckBox
									containerStyle={[styles.checkbox, styles.shadow]}
									textStyle={styles.checkBoxText}
									title="Crédito"
									checkedColor="#F0831C"
									checked={credito}
									onPress={() => handleSelectPayment('credito')}
								/>

								<CheckBox
									containerStyle={[styles.checkbox, styles.shadow]}
									textStyle={styles.checkBoxText}
									title="Débito"
									checkedColor="#F0831C"
									checked={debito}
									onPress={() => handleSelectPayment('debito')}
								/>

								<CheckBox
									containerStyle={[styles.checkbox, styles.shadow]}
									textStyle={styles.checkBoxText}
									title="Dinheiro"
									checkedColor="#F0831C"
									checked={dinheiro}
									onPress={() => handleSelectPayment('dinheiro')}
								/>
							</View>
							
							{/* <View style={styles.margin18}>
								<Text style={styles.title}>Pague no app:</Text>
								
								<CheckBox
									containerStyle={[styles.checkbox, styles.shadow]}
									textStyle={styles.checkBoxText}
									title="PicPay"
									checkedColor="#F0831C"
									checked={picPay}
									onPress={() => handleSelectPayment('picpay')}
								/>
							</View> */}

							<View style={styles.margin18}>
								<Button
									title="Prosseguir"
									enabled={enabled2}
									color="primary"
									onPress={() => handleNavigateToOrderStep3()}
								/>
							</View>
						</View>
					</ScrollView>
				</SafeAreaView>
			</View>
		</>
	);
}
