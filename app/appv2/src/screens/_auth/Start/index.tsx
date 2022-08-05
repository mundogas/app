import React from 'react';
import { 
  View, 
  Text, 
  Image,
  TouchableOpacity,
} from 'react-native';
import { Button } from '../../../components/Buttons/Button';
import { useNavigation } from '@react-navigation/native';

//Estilos
import { styles } from './styles';


export function Start(){
  /*===============VARIÁVEIS DE CONTROLE ===================*/
  //Navegação
  const navigation = useNavigation();

  async function handleStep1() {
    navigation.navigate('Register_1');
  }

  async function handleSingIn() {
    navigation.navigate('SignIn');
  }

  return(
    <>
    <View style={styles.container}>
      <View style={styles.textContent}>
        <Text style={styles.title}>Acabou o Gás?</Text>
        <Text style={styles.text}>Não se preocupe! Aqui você vai encontrar os melhores preços e marcas da sua região.</Text>
      </View>

      <View style={styles.main}>
        <Image style={styles.image}
          source={require('../../../assets/ilustracao/ilustracao.png')} 
        />
      </View>

      <View >
        <Button color="primary" title="Começar" enabled={true} onPress={() => handleStep1()} />
        
        <TouchableOpacity 
        style={{marginVertical: 16}}
        onPress={() => handleSingIn()}
        >
          <Text style={{textAlign:'center'}}>Já possui cadastro? <Text style={styles.strong}>Entrar</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
}