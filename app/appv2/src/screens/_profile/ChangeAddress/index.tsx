import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Button } from '../../../components/Buttons/Button';
import { Header } from '../../../components/Headers/Header';
import { styles } from './styles';
import { Input } from '../../../components/Inputs/Input';
import { Select, CheckIcon } from 'native-base';

import { useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CreateUser } from '../../../interfaces/interfaces';
import { AddressContext } from '../../../contexts/AddressContext';
import { useAxios } from '../../../hooks/useAxios';

export function ChangeAddress({navigation}: any) {
  /*===============VARIÁVEIS DE CONTROLE ===================*/
  const { data } = useAxios('cliente/cidades-ativas');

  //Params
  const route = useRoute();
  const params = route.params as CreateUser;
	const { 
    loading,
    name, setName,
    type, setType,
    address, setAddress,
    number, setNumber,
    district, setDistrict,
    complement, setComplement,
    zipcode, setZipcode,
    cidade, setCidade,
    cidadeID, setCidadeID,
    handleCreate,
    handleUpdate,
    handleDelete,
    resetVars
  }: any = useContext(AddressContext);
  const [enabled, setEnabled] = useState(false);

  /*===============FUNÇÕES ===================*/
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
			resetVars();
      if(params){ 
        valuesParamsInput();
      }
		});

		return unsubscribe;

  },[navigation]);

  function setConstCidade(id: any){
    setCidadeID(id);

    //Pegar nome da cidade
    let filterCidade = data?.filter((cidade: any) => cidade.id === id);
    setCidade(filterCidade[0].name);

    filterCidade[0].name && id ? setEnabled(true) : setEnabled(false);
  }
 
  function validateFormButtonEnable() {
    if(!params){
      name && type && address && number && district && complement && zipcode && cidade && cidadeID ? setEnabled(true) : setEnabled(false);
    }

    else {
      name && type && address && number && district && complement && zipcode ? setEnabled(true) : setEnabled(false);
    }
  }

  function valuesParamsInput() {
    setName(params.data.name);
    setType(params.data.type);
    setAddress(params.data.address);
    setNumber(params.data.number);
    setDistrict(params.data.district);
    setComplement(params.data.complement);
    setZipcode(params.data.zipcode);
  }

  return (
    <>
      {
        params ?
        <Header title="Editar meu endereço" back={true} /> :
        <Header title="Adicionar endereço" back={true} />
      }

      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View>
            {
              params &&
              <Text style={styles.textCidade}>Cidade:  <Text style={styles.strong}>{params.data.cidade.cidade_name.name}</Text></Text>
            }

            <View style={[params && styles.form]}>
              <Input
                title="Nome - para você identificar depois :)"
                placeholder="ex. Minha casa, Trabalho.."
                width="100"
                value={name}
                autoCorrect={false}
                onChangeText={setName}
                onContentSizeChange={validateFormButtonEnable}
              />

              <Input
                title="Tipo de imóvel"
                placeholder="ex. Apto, casa.."
                width="100"
                value={type}
                autoCorrect={false}
                onChangeText={setType}
                onContentSizeChange={validateFormButtonEnable}
              />

              <Input
                title="CEP"
                placeholder="ex. 11704000"
                width="100"
                value={zipcode}
                autoCorrect={false}
                onChangeText={setZipcode}
                onContentSizeChange={validateFormButtonEnable}
              />

              <Input
                title="Rua"
                placeholder="ex. Av. Pres. Kennedy"
                width="100"
                value={address}
                autoCorrect={false}
                onChangeText={setAddress}
                onContentSizeChange={validateFormButtonEnable}
              />

              <View style={{ flexDirection: 'row' }}>
                <Input
                  title="Nº"
                  placeholder="115, S/N"
                  width="30"
                  value={number}
                  autoCorrect={false}
                  onChangeText={setNumber}
                  onContentSizeChange={validateFormButtonEnable}
                />

                <Input
                  title="Complemento"
                  placeholder="apto, bl.."
                  width="60"
                  value={complement}
                  autoCorrect={false}
                  onChangeText={setComplement}
                  onContentSizeChange={validateFormButtonEnable}
                />
              </View>

              <Input
                title="Bairro"
                placeholder="Ocian, Tupy.."
                width="100"
                value={district}
                autoCorrect={false}
                onChangeText={setDistrict}
                onContentSizeChange={validateFormButtonEnable}
              />
              
              {
                !params && data &&
                <View style={{marginTop: 8}}>
                  <Text style={styles.text}>Cidade</Text>
                  <Select
                    selectedValue={cidadeID}
                    height="50"
                    borderColor="rgba(239, 118, 29, 0.25)"
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
                      data?.map((cidade: any) => (
                        <Select.Item 
                        key={String(cidade.id)} 
                        label={cidade.name} 
                        value={cidade.id} 
                        />
                      ))
                    }
                  </Select>
                </View>
              }
            </View>
          </View>

          <View style={{ marginTop: 24 }}>
            {
              params && !loading &&
              <>
                <Button
                  title="Salvar alterações"
                  enabled={enabled}
                  color="primary"
                  onPress={() => handleUpdate(params.data.id)}
                />
              
                <View style={{ marginTop: 8 }}></View>
                <Button
                  title="Deletar"
                  enabled={true}
                  color="red"
                  onPress={() => handleDelete(params.data.id)}
                />
              </>
            }

            {
              params && loading &&
              <ActivityIndicator color="#F0831C" />
            }

            {
              !params &&
              <Button
                title="Salvar"
                enabled={enabled}
                color="primary"
                onPress={() => handleCreate()}
              />
            }
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}