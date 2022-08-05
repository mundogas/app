import React from 'react';
import { 
	View, 
} from 'react-native';
import { styles } from './styles';

import { Header } from '../../components/Headers/Header';
import { ListItemProfile } from '../../components/Touchable/ListItemProfile';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../services/auth';
export function Profile() {
	/*===============VARIÁVEIS DE CONTROLE ===================*/
	//Auth
	const { signOut, user } = useAuth();
	console.log(user?.name);
	//Navegação
	const navigation = useNavigation();

	/*===============FUNÇÕES DE NAVEGAÇÃO ===================*/
	async function handleSignOut(){
		await signOut();
	}

	function handleNavigateToPersonalInformation(){
		navigation.navigate('PersonalInformation');
	}

	function handleNavigateToChangePassword(){
		navigation.navigate('ChangePassword');
	}

	function handleNavigateToAddress(){
		navigation.navigate('AddressScreen');
	}

	function handleExportApp(){
		navigation.navigate('SocialMedia');
	}

	return (
		<>
			<Header title={['Olá, ', user?.name_array[0]]} back={false} />

			<View style={styles.container}>
				<View>
					<ListItemProfile
						title="Meu dados"
						subTitle="Minhas informações de conta"
						icon="user"
						arrow={true}
						onPress={handleNavigateToPersonalInformation}
					/>

					<ListItemProfile
						title="Endereços"
						subTitle="Meus endereços de entrega"
						icon="map-pin"
						arrow={true}
						onPress={handleNavigateToAddress}
					/>

					<ListItemProfile
						title="Segurança"
						subTitle="Alterar a senha de acesso"
						icon="lock"
						arrow={true}
						onPress={handleNavigateToChangePassword}
					/>

					<ListItemProfile
						title="Redes Sociais"
						subTitle="Nos siga nas redes sociais"
						icon="send"
						arrow={true}
						onPress={handleExportApp}
					/>
				</View>

				<View style={{marginBottom: 8}}>
					<ListItemProfile
						title="Sair"
						subTitle={null}
						icon="log-out"
						arrow={false}
						onPress={handleSignOut}
					/>
				</View>
      		</View>
		</>
	);
}
