import React, {useState} from 'react';
import { 
  View, 
  Text, 
  TextInput,
  Alert
} from 'react-native';
import { Button } from '../../../components/Buttons/Button';
import { Header } from '../../../components/Headers/Header';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//Estilos
import { styles } from './styles';

export function CreateAddress(){
  /*===============VARIÁVEIS DE CONTROLE ===================*/
  //Dados
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [complement, setComplement] = useState('');
  const [zipcode, setZipcode] = useState('');

  const [enabled, setEnabled] = useState(false);

  //Navegação
  const navigation = useNavigation();

  /*===============FUNÇÕES ===================*/
  function validateFormButtonEnable(){
    address ? setEnabled(true) : setEnabled(false);
  }

  async function handleCreate() {
    if(!address){
      Alert.alert('Para prosseguir, informe os dados.');
      return;
    }

    //navigation.navigate('Register_3', params);
  }

  return(
    <>
      <Header title="Qual o seu endereço?" back={true} />

      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View>
            <View style={styles.form}>
              <View style={styles.containerText}>
                <View style={[styles.contentText]}>
                  <View>
                    <Text style={styles.text}>Nome</Text>
                    <TextInput 
                      style={styles.input}
                      placeholder="ex. Minha casa, Trabalho.."
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
                    <Text style={styles.text}>Tipo</Text>
                    <TextInput 
                      style={styles.input}
                      placeholder="ex. Apto, casa.."
                      value={type}
                      autoCorrect={false}
                      onChangeText={setType}
                      onContentSizeChange={validateFormButtonEnable}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.containerText}>
                <View style={[styles.contentText]}>
                  <View>
                    <Text style={styles.text}>CEP</Text>
                    <TextInput 
                      style={styles.input}
                      placeholder="ex. 11704000"
                      value={zipcode}
                      autoCorrect={false}
                      onChangeText={setZipcode}
                      onContentSizeChange={validateFormButtonEnable}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.containerText}>
                <View style={[styles.contentText]}>
                  <View>
                    <Text style={styles.text}>Rua</Text>
                    <TextInput 
                      style={styles.input}
                      placeholder="ex. Av. Pres. Kennedy"
                      value={address}
                      autoCorrect={false}
                      onChangeText={setAddress}
                      onContentSizeChange={validateFormButtonEnable}
                    />
                  </View>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={[styles.containerText, styles.input30]}>
                  <View style={[styles.contentText]}>
                    <View>
                      <Text style={styles.text}>Nº</Text>
                      <TextInput 
                        style={styles.input}
                        placeholder="115, S/N"
                        value={number}
                        autoCorrect={false}
                        onChangeText={setNumber}
                        onContentSizeChange={validateFormButtonEnable}
                      />
                    </View>
                  </View>
                </View>

                <View style={[styles.containerText, styles.input60]}>
                  <View style={[styles.contentText]}>
                    <View>
                      <Text style={styles.text}>Complemento</Text>
                      <TextInput 
                        style={styles.input}
                        placeholder="apto, bl.."
                        value={complement}
                        autoCorrect={false}
                        onChangeText={setComplement}
                        onContentSizeChange={validateFormButtonEnable}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.containerText}>
                <View style={[styles.contentText]}>
                  <View>
                    <Text style={styles.text}>Bairro</Text>
                    <TextInput 
                      style={styles.input}
                      placeholder="Ocian, Tupy.."
                      value={district}
                      autoCorrect={false}
                      onChangeText={setDistrict}
                      onContentSizeChange={validateFormButtonEnable}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={{marginTop: 24}}>
            <Button
              title="Prosseguir"
              enabled={enabled}
              onPress={() => handleCreate()}
              color="primary"
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}