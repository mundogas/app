import React, { useContext, useEffect, useState } from 'react';
import { 
	View, 
	Text,  
	SafeAreaView,
	ScrollView,
	Image,
	ActivityIndicator,
} from 'react-native';
import { styles } from './styles';

import { Header } from '../../../components/Headers/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { useAuth } from '../../../services/auth';
import { useAxios } from '../../../hooks/useAxios';
import { CreateUser } from '../../../interfaces/interfaces';
import api from '../../../services/api';
import { TextArea } from '../../../components/Inputs/TextArea';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from '../../../components/Buttons/Button';
import { OrderContext } from '../../../contexts/OrderContext';

export function SendFeedback() {
	/*===============VARIÁVEIS DE CONTROLE ===================*/
	//Params
	const route = useRoute();
	const params = route.params as CreateUser;

	const { sendFeedbackOrder, loadingFeedback }: any = useContext(OrderContext);
	const navigation = useNavigation();

	const [stars, setStars] = useState(5);
	const [obs, setObs] = useState('');
 	const [max, setMax] = useState([1, 2, 3, 4, 5]);
	const [enabled, setEnabled] = useState(false);

	/*===============FUNÇÕES ===================*/
	function handleSetStars(item: number){
		setStars(item);

		validateFormButtonEnable();
	}

	function validateFormButtonEnable() {
		stars ? setEnabled(true) : setEnabled(false);
	}
	
	function feedbackOrder(){
		let addFeedback = {
			pedido_id: params.data.id,
			entregador_id: params.data.entregador_id ? params.data.entregador_id : 1,
			stars: stars,
			obs: obs
		}

		sendFeedbackOrder(addFeedback);
	}

	return (
		<>
			<Header title="Feedback do pedido" back={true} />

			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
					<View style={styles.margin24}>
						<Text style={styles.text}> 
							Classifique a sua experiência 
						</Text> 
						
						<View style={styles.ratingBarStyle}> 
							{max.map((item) => { 
							return ( 
								<TouchableOpacity 
									activeOpacity={0.7} 
									key={item} 
									onPress={() => handleSetStars(item)}
								> 
									{
										item <= stars ?
										<Icon name="star" size={30} style={styles.icon} /> :
										<Icon name="star-o" size={30} style={styles.icon} />
									}
								</TouchableOpacity> 
							); 
							})} 
						</View> 
						
						<Text style={styles.textStyle}> 
							{stars} / {Math.max.apply(null, max)} 
						</Text> 
						
						<TextArea
							title="Observação (opcional)"
							placeholder="Ocian, Tupy.."
							value={obs}
							autoCorrect={false}
							onChangeText={setObs}
							onContentSizeChange={validateFormButtonEnable}
						/>

						<View style={styles.margin24}></View>
						
						{loadingFeedback ? 
							<ActivityIndicator style={{marginTop: 10}} color="#F0831C" /> : 
							<Button
								title="Enviar feedback"
								enabled={enabled}
								color="primary"
								onPress={() => feedbackOrder()}
							/>
						}
					</View>
				</ScrollView>
			</View>
		</>
	);
}
