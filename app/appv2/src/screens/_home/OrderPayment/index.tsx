import React, { useContext, useEffect, useState } from 'react';
import { 
	View, 
	Text,  
	Image,
	SafeAreaView,
	ScrollView,
} from 'react-native';
import { styles } from './styles';
import { Header } from '../../../components/Headers/Header';
import { Button } from '../../../components/Buttons/Button';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Payment } from '../../../interfaces/interfaces';
import { OrderContext } from '../../../contexts/OrderContext';
import * as Linking from 'expo-linking';
import { parseISO, format, intervalToDuration } from 'date-fns';
import pt from 'date-fns/esm/locale/pt/index.js';
import CountDown from 'react-native-countdown-component';

export function OrderPayment() {
	/*===============VARIÁVEIS DE CONTROLE ===================*/
	//Params
	const route = useRoute();
	const params = route.params as Payment;

	const navigation = useNavigation();

	//const [timer, setTimer] = useState<any>();
	const [enable, setEnable] = useState(true);

	const { qtde, enabled1, handleStatusOrder, enabledPayment, timer, setTimer, setEnabledPayment }: any = useContext(OrderContext);

	function handleNavigateToHome(){
		//Reseta a pilha
		navigation.reset({
			index: 0,
			routes: [{name: 'Home'}],
		});
	}

	function handleNavigateToLinkPayment(){
		Linking.openURL(params.payment.paymentUrl);
	}

	// useEffect(() => {
	// 	handleTimer();
	// }, []);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			setEnabledPayment(false);
			handleEnabled();
			handleTimer();
		});

      	return () => unsubscribe();
	}, []);                              
	  

	function handleEnabled(){
		setInterval(() => {
			console.log(enabledPayment)
			enabledPayment && console.log('entrei');
			!enabledPayment && console.log('falsee');
			//handleStatusOrder(params.payment.referenceId, params.order);
			
			return;
		}, 20000);
	}
	
	function handleDisabled(){
		setEnabledPayment(false)
	}

	async function handleTimer(){
		let expires = parseISO(params.payment.expiresAt);
		
		let now = new Date();

		let result = intervalToDuration({start: now, end: expires});

		let seconds = Number(result.minutes) * 60 + Number(result.seconds);

		setEnabledPayment(true);
		setTimer(seconds);
	}

	if(enabledPayment && timer){
		return (
			<>
			<Header title="Pagamento" back={true} />

			<View style={styles.container}>
				<SafeAreaView style={styles.safeArea}>
					<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
						<View style={styles.main}>
							<View style={styles.margin18}>
								<CountDown
									until={timer}
									timeToShow={['M', 'S']}
									timeLabels={{m: '', s: ''}}
									onFinish={() => handleDisabled()}
									separatorStyle={{color: '#F0831C'}}
									digitStyle={{
										backgroundColor: '#FFF', 
										borderWidth: 2, 
										borderColor: '#F0831C', 
										borderRadius: 100,
									}}
									digitTxtStyle={{
										color: 'rgba(0,0,0,.7)', 
										fontWeight: 'bold', 
										fontFamily: 'Poppins_700Bold',
									}}
									showSeparator
									size={30}
								/>
							</View>
								
							<View style={[styles.margin18, styles.bgTitle]}>
								{
									params.data.promotion === 1 ?
									<Text style={styles.title}>
										R${parseFloat(String(params.data.preco.discount_price * qtde)).toFixed(2)}
									</Text>
									:
									<Text style={styles.title}>
										R${parseFloat(String(params.data.preco.sale_price * qtde)).toFixed(2)}
									</Text>
								}
							</View>

							<View style={[styles.contentImage, styles.margin8, styles.marginBottom18]}>
								<Image style={styles.image}
								source={{uri: params.payment.qrcode.base64}} 
								/>
							</View>
							
							<Button
								title="Abrir Link de Pagamento"
								enabled={enabledPayment}
								color="primary"
								onPress={() => handleNavigateToLinkPayment()}
							/>
						</View>
					</ScrollView>
				</SafeAreaView>
			</View>
			</>
		)
	}

	return (
		<>
			<Header title="Pagamento" back={false} />

			<View style={[styles.container, {justifyContent: 'space-around'}]}>
				
				<View style={[styles.contentImage]}>
					<Text style={styles.expired}>Ordem de pagamento expirada, tente novamente.</Text>
					
					<Image style={[styles.imageSick, styles.margin18,]}
						source={require('../../../assets/ilustracao/sick.png')} 
					/>

				</View>

				<Button
					title="Voltar à Página Inicial"
					enabled={true}
					color="primary"
					onPress={() => handleNavigateToHome()}
				/>
			</View>
		</>
	);
}
