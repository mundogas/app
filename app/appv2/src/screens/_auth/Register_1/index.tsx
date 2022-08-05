import React, {useEffect, useState} from 'react';
import { 
  View, 
  ActivityIndicator,
  Alert,
  Text
} from 'react-native';
import { Button } from '../../../components/Buttons/Button';
import { HeaderBack } from '../../../components/Headers/Auth/HeaderBack';
import { useNavigation} from '@react-navigation/native';
import { Select, CheckIcon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//Estilos
import { styles } from './styles';
import { useAxios } from '../../../hooks/useAxios';
import api from '../../../services/api';

export function Register_1(){
  /*===============VARIÁVEIS DE CONTROLE ===================*/
  //Dados
  const { data }: any = useAxios('cidades-ativas');
  //const [data, setData] = useState<any>();
  const [cidade, setCidade] = useState('');
  const [cidadeID, setCidadeID] = useState('');
  const [enabled, setEnabled] = useState(false);

  //Loading
  const [loading, setLoading] = useState('');

  //Navegação
  const navigation = useNavigation();

  /*===============FUNÇÕES ===================*/
  function setConstCidade(id: string){
    setCidadeID(id);

    //Pegar nome da cidade
    let filterCidade = data?.filter((cidade: any) => cidade.id === id);
    setCidade(filterCidade[0].name);

    filterCidade[0].name && id ? setEnabled(true) : setEnabled(false);
  }

  async function handleStep2() {
    if(!cidade){
      Alert.alert('Para prosseguir, selecione a cidade.');
      return;
    }

    navigation.navigate('Register_2', {'data': {'cidade_id': cidadeID, 'cidade_name': cidade}});
  }

  if(!data){
    return (
      <>
        <HeaderBack title="Onde deseja receber?" />

        <View style={[styles.container, {justifyContent: 'center'}]}>
          <Text style={[styles.warning, {textAlign: 'center'}]}>Carregando cidades</Text>
          <ActivityIndicator style={{marginTop: 10}} color="#F0831C" />
        </View>
      </>
    )
  }

  return(
    <>
      <HeaderBack title="Onde deseja receber?" />

      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View>
            <Text style={styles.warning}>Atenção!</Text>
            <Text style={styles.text}>Essas são as cidades que estamos atendendo no momento:</Text>
          </View>

          <View style={styles.form}>
            <Select
              selectedValue={cidadeID}
              height="50"
              borderColor="rgba(0,0,0,0.025)"
              fontSize="14"
              accessibilityLabel="Escolha a cidade"
              placeholder="Escolha a cidade"
              _selectedItem={{
                bgColor: "rgba(239, 118, 29, 0.25)",
                leftIcon: <CheckIcon size="3" />,
              }}
              _item={{
                bgColor: '#fff'
              }}
              mt={1}
              onValueChange={(itemValue) => setConstCidade(itemValue)}
            >
              {
                data?.map((cidade: any, i: number) => (
                  <Select.Item 
                  key={String(i)} 
                  label={cidade.name} 
                  value={cidade.id} 
                  />
                ))
              }
            </Select>
          </View>
        </KeyboardAwareScrollView>
              
        <View>
          {loading ? 
            <ActivityIndicator style={{marginTop: 10}} color="#F0831C" /> : 
            <Button
              title="Prosseguir"
              enabled={enabled}
              color="primary"
              onPress={() => handleStep2()}
            />
          }
        </View>
      </View>
    </>
  );
}