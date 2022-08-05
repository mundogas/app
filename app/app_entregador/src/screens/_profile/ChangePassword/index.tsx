import React, { useEffect, useState } from 'react';
import { 
	View, 
	Text,  
	ActivityIndicator,
	Alert
} from 'react-native';
import { styles } from './styles';

import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../../services/api';
import { useAuth } from '../../../services/auth';
import { Feather as Icon } from '@expo/vector-icons';
import { Params } from '../../../interfaces/interfaces';
import { Header } from '../../../components/Headers/Header';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from '../../../components/Buttons/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export function ChangePassword() {
	/*===============VARIÁVEIS DE CONTROLE ===================*/
	const { user } = useAuth();
	const navigation = useNavigation();

	//Dados
	const [currentPassword, setCurrentPassword] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	const [viewPassword, setViewPassword] = useState<any>({currentPassword: true, password: true, passwordConfirmation: true});

	const [enabled, setEnabled] = useState(false);
	const [loading, setLoading] = useState(false);

	/*===============FUNÇÕES DE NAVEGAÇÃO ===================*/


	/*===============FUNÇÕES DE DADOS ===================*/
	function validateFormButtonEnable(){
		currentPassword && password && passwordConfirmation 
		? setEnabled(true) : setEnabled(false);
	}

	function handleEditPassword(){
		if(!currentPassword || !password || !passwordConfirmation){
			Alert.alert('Para prosseguir, informe os dados.');
      		return;
		}
		
		setLoading(true);
	
		let updatePassword = {
			current_password: currentPassword,
			password: password,
			password_confirmation: passwordConfirmation
		}

		api.put('entregador/alterar-senha/' +user?.id, updatePassword).then((res: any) => {
			console.log(res.data);
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
						<View style={styles.containerText}>
							<View style={[styles.contentText]}>
								<Icon name="unlock" size={18} style={styles.iconColorGray} />

								<View style={{marginLeft: 10}}>
									<Text style={styles.text}>Senha atual</Text>
									<TextInput 
										style={styles.input}
										placeholder="Insira sua senha atual"
										value={currentPassword}
										autoCorrect={false}
										secureTextEntry={viewPassword.currentPassword}
										onChangeText={setCurrentPassword}
										onContentSizeChange={validateFormButtonEnable}
									/>
								</View>

								<TouchableOpacity 
									onPress={() => setViewPassword({...viewPassword, currentPassword: !viewPassword.currentPassword})}
								>
									<Icon name="eye" size={20} style={styles.iconColorPrimary}/>
								</TouchableOpacity>
							</View>
						</View>

						<View style={styles.containerText}>
							<View style={[styles.contentText]}>
								<Icon name="lock" size={18} style={styles.iconColorGray} />

								<View style={{marginLeft: 10}}>
									<Text style={styles.text}>Nova senha</Text>
									<TextInput 
										style={styles.input}
										placeholder="Insira sua nova senha"
										value={password}
										autoCorrect={false}
										secureTextEntry={viewPassword.password}
										onChangeText={setPassword}
										onContentSizeChange={validateFormButtonEnable}
									/>
								</View>

								<TouchableOpacity
									onPress={() => setViewPassword({...viewPassword, password: !viewPassword.password})}
								>
									<Icon name="eye" size={20} style={styles.iconColorPrimary}/>
								</TouchableOpacity>
							</View>
						</View>

						<View style={styles.containerText}>
							<View style={[styles.contentText]}>
								<Icon name="lock" size={18} style={styles.iconColorGray} />

								<View style={{marginLeft: 10}}>
									<Text style={styles.text}>Repita a nova senha</Text>
									<TextInput 
										style={styles.input}
										placeholder="Repita sua nova senha"
										value={passwordConfirmation}
										autoCorrect={false}
										secureTextEntry={viewPassword.passwordConfirmation}
										onChangeText={setPasswordConfirmation}
										onContentSizeChange={validateFormButtonEnable}
									/>
								</View>

								<TouchableOpacity
									onPress={() => setViewPassword({...viewPassword, passwordConfirmation: !viewPassword.passwordConfirmation})}
								>
									<Icon name="eye" size={20} style={styles.iconColorPrimary}/>
								</TouchableOpacity>
							</View>
						</View>
					</View>

					<View  style={{marginTop: 30}}>
						{loading ? 
						<ActivityIndicator color="#F0831C" /> : 
						<Button
							title="Salvar alterações"
							onPress={() => handleEditPassword()}
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
