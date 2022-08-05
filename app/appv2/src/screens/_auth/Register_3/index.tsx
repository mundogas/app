import React, {useEffect, useState} from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import { Button } from '../../../components/Buttons/Button';
import { HeaderBack } from '../../../components/Headers/Auth/HeaderBack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Feather as Icon } from '@expo/vector-icons';
import { styles } from './styles';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { CreateUser } from '../../../interfaces/interfaces';
import api from '../../../services/api';

export function Register_3(){
  /*===============VARIÁVEIS DE CONTROLE ===================*/
  //Params
  const route = useRoute();
  const params = route.params as CreateUser;

  //Dados
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [viewPassword, setViewPassword] = useState<any>({password: true, passwordConfirmation: true});
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  //Navegação
  const navigation = useNavigation();

  /*===============FUNÇÕES ===================*/
  function validateFormButtonEnable(){
    email && name && password ? setEnabled(true) : setEnabled(false);
  }

  async function handleAddUser() {
    if(!name || !email || !password){
      Alert.alert('Para prosseguir, informe os dados.');    
      return;
    }
    setLoading(true);

    let address = {
      name: params.data.name,
      type: params.data.type,
      address: params.data.address,
      number: params.data.number,
      district: params.data.district,
      zipcode: params.data.zipcode,
      complement: params.data.complement,
      cidade_id: params.data.cidade_id
    }

    let user = {
      name: name, 
      email: email,
      phone: phone, 
      password: password,
      password_confirmation: passwordConfirmation,
      address: address,
    }

    api.post('auth/cliente/register', user).then((res: any) => {
      console.log(res.data);
      setLoading(false);
      Alert.alert('Cadastro realizado com sucesso!');
      navigation.navigate('Start');
    });
   
  }

  return(
    <>
      <HeaderBack title="Quais os seus dados?" />

      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View>
            <Text style={styles.warning}>Aviso!</Text>
            <Text style={styles.text}>É importante inserir um número de telefone válido para caso precisemos entrar em contato com você.</Text>

            <View style={styles.form}>
              <View style={styles.containerText}>
                <View style={[styles.contentText]}>
                  <View>
                    <Text style={styles.text}>Nome</Text>
                    <TextInput 
                      style={styles.input}
                      placeholder="Nome e sobrenome"
                      value={name}
                      autoCorrect={false}
                      onChangeText={setName}
                      onContentSizeChange={validateFormButtonEnable}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.containerText}>
                <View style={[styles.contentText]}>
                  <View>
                    <Text style={styles.text}>Celular</Text>
                    <TextInput 
                      style={styles.input}
                      placeholder="Celular para contato"
                      value={phone}
                      autoCorrect={false}
                      onChangeText={setPhone}
                      onContentSizeChange={validateFormButtonEnable}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.containerText}>
                <View style={[styles.contentText]}>
                  <View>
                    <Text style={styles.text}>Email</Text>
                    <TextInput 
                      style={styles.input}
                      placeholder="Email para acesso"
                      value={email}
                      autoCorrect={false}
                      onChangeText={setEmail}
                      onContentSizeChange={validateFormButtonEnable}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.containerText}>
                <View style={[styles.contentText]}>
                  <View>
                    <Text style={styles.text}>Senha</Text>
                    <TextInput 
                      style={styles.input}
                      placeholder="Insira uma senha"
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
                  <View>
                    <Text style={styles.text}>Repita a senha</Text>
                    <TextInput 
                      style={styles.input}
                      placeholder="Repita a senha"
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
          </View>

          <View style={{marginTop: 20}}>
          {loading ? 
            <ActivityIndicator  color="#F0831C" /> : 
            <Button
              color="primary"
              title="Cadastrar"
              enabled={enabled}
              onPress={() => handleAddUser()}
            />
          }
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}