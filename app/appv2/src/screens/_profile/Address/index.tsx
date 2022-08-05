import React, { useContext } from 'react';
import { 
	View, 
	ScrollView,  
} from 'react-native';
import { styles } from './styles';

import { Header } from '../../../components/Headers/Header';
import { ButtonFloat } from '../../../components/Buttons/ButtonFloat';
import { ListItemAddress } from '../../../components/Touchable/ListItemAddress';

import { SafeAreaView } from 'react-native-safe-area-context';
import { AddressContext } from '../../../contexts/AddressContext';

export function Address({navigation}: any) {
	/*===============VARIÁVEIS DE CONTROLE ===================*/
	//Address
	const { data }: any = useContext(AddressContext);

	/*===============FUNÇÕES DE NAVEGAÇÃO ===================*/
	function handleNavigateToChangeAddress(endereco: any){
		if(endereco){
			navigation.navigate('ChangeAddress', {data: endereco});
		}
		else {
			navigation.navigate('ChangeAddress');
		}
	}

	return (
		<>
			<Header title="Meus endereços" back={true} />

			<View style={styles.container}>
				<SafeAreaView style={styles.safeArea}>
					<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
					{
						data?.map((endereco: any) => (
							<ListItemAddress
								key={endereco.id}
								name={endereco.name}
								address={endereco.address}
								number={endereco.number}
								district={endereco.district}
								cidade_name={endereco.cidade.cidade_name.name}
								onPress={() => handleNavigateToChangeAddress(endereco)}
							/>
						))
					}
				</ScrollView>
				</SafeAreaView>

				<ButtonFloat
					onPress={() => handleNavigateToChangeAddress(null)}
				/>
				
      		</View>
		</>
	);
}
