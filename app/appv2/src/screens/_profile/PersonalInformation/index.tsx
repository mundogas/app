import React, { useEffect, useState } from 'react';
import { 
	View, 
	ActivityIndicator,
	Alert
} from 'react-native';
import { styles } from './styles';
import { Header } from '../../../components/Headers/Header';
import { Button } from '../../../components/Buttons/Button';
import { InputIcon } from '../../../components/Inputs/InputIcon';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useAuth } from '../../../services/auth';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';

export function PersonalInformation() {
	/*===============VARIÁVEIS DE CONTROLE ===================*/
	const { user, updateUser } = useAuth();
	const navigation = useNavigation();

	//Dados
	const [name, setName] = useState<any>();
	const [email, setEmail] = useState<any>();
	const [phone, setPhone] = useState<any>();

	const [enabled, setEnabled] = useState(false);
	const [loading, setLoading] = useState(false);

	/*===============FUNÇÕES ===================*/
	useEffect(() => {
		valuesParamsInput();
	}, []);

	function valuesParamsInput(){
		setName(user?.name);
		setEmail(user?.email);
		setPhone(user?.phone);
	}

	function validateFormButtonEnable(){
		name && email && phone 
		? setEnabled(true) : setEnabled(false);
	}

	async function handleEditProfile(){
		if(!name || !email || !phone ){
			Alert.alert('Para prosseguir, informe os dados.');
      		return;
		}

		setLoading(true);
		
		let updateProfile = {
			name: name,
			email: email,
			phone: phone,
		}

		api.put('cliente/editar-perfil/' +user?.id, updateProfile).then((res: any) => {
			updateUser(Number(res.data.data.id), res.data.data.name, res.data.data.name_array, res.data.data.email, res.data.data.phone);
		 
			setLoading(false);
			navigation.goBack();
		});
	}

	return (
		<>
			<Header title="Meus dados" back={true} />

			<View style={styles.container}>
				<KeyboardAwareScrollView >
					<View>
						<InputIcon
							title="Nome"
							placeholder="Nome e sobrenome"
							icon="user"
							eye={false}
							value={name}
							autoCorrect={false}
							onChangeText={setName}
							onContentSizeChange={validateFormButtonEnable}
						/>

						<InputIcon
							title="Email"
							placeholder="Email de acesso"
							icon="mail"
							eye={false}
							value={email}
							autoCorrect={false}
							onChangeText={setEmail}
							onContentSizeChange={validateFormButtonEnable}
						/>

						<InputIcon
							title="Celular"
							placeholder="Celular para contato"
							icon="phone"
							eye={false}
							value={phone}
							autoCorrect={false}
							onChangeText={setPhone}
							onContentSizeChange={validateFormButtonEnable}
						/>
					</View>

					<View  style={{marginTop: 30}}>
						{loading ? 
						<ActivityIndicator color="#F0831C" /> : 
						<Button
							title="Salvar alterações"
							onPress={() => handleEditProfile()}
							enabled={enabled}
							color="primary"
						/>
						}
					</View>
				</KeyboardAwareScrollView>
			</View>
		</>
	);
}
