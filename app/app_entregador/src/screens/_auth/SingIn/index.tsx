import React, {useState} from 'react';
import { 
  View, 
  Text, 
  TextInput,
  Alert,
  Image,
  ActivityIndicator
} from 'react-native';

import { Button } from '../../../components/Buttons/Button';
import { styles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useAuth } from "../../../services/auth";
import { useNavigation } from '@react-navigation/native';

export function SignIn(){
  /*===============VARIÁVEIS DE CONTROLE ===================*/
  //Dados do Auth
  const { signIn, loading } = useAuth();

  //emanuel@mundodogas.com.br //12345678
  //Dados
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [enabled, setEnabled] = useState(false);

  //Navegação
  const navigation = useNavigation();

  /*===============FUNÇÕES===================*/
  function validateFormButtonEnable(){
    email && password ? setEnabled(true) : setEnabled(false);
  }
  //cliente@app.com.br //12345678
  async function handleSignIn() {
    if(!email || !password){
      Alert.alert('Dados incorretos. Confira seu email e senha e tente novamente.');
      return;
    }

    try {
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }
  
  /*===============FUNÇÕES DE NAVEGAÇÃO ===================*/
  function navigateToForgotPassoword() {
    navigation.navigate('Forgot');
  }

  return(
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View>
          <View style={styles.imageCont}>
            <Image style={styles.image}
            source={require('../../../assets/brand/logomarca.png')} 
            />
          </View>
          
          <View style={styles.form}>
            <View style={styles.containerText}>
              <View style={[styles.contentText]}>
                <Text style={styles.text}>Email</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="Email de acesso"
                    value={email}
                    autoCorrect={false}
                    keyboardType='email-address'
                    onChangeText={setEmail}
                    onContentSizeChange={validateFormButtonEnable}
                  />
              </View>
            </View>

            <View style={styles.containerText}>
              <View style={[styles.contentText]}>
                <Text style={styles.text}>Senha</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="Digite a senha"
                    value={password}
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    onContentSizeChange={validateFormButtonEnable}
                  />
              </View>
            </View>
          </View>

          <View style={{marginTop: 24}}>
            {loading ? 
              <ActivityIndicator style={{marginTop: 10}} color="#F0831C" /> : 
              <Button
                title="Entrar"
                color="primary"
                enabled={enabled}
                onPress={() => handleSignIn()}
              />
            }
          {/*             
            <Text style={styles.login}>Esqueceu a senha? <Text style={styles.strong} onPress={navigateToForgotPassoword}>Redefinir</Text></Text> */}
          </View>
        </View>
      </KeyboardAwareScrollView >
    </View>
  );
}