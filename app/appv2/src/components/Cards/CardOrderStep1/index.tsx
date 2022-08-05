import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { OrderContext } from '../../../contexts/OrderContext';
import { TextInput } from 'react-native-gesture-handler';

type Props =  {
  title: string;
  price: any;
  weight: any;
}

export function CardOrderStep1({title, price, weight} : Props){
    const { peso, setPeso, qtde, setQtde, setEnabled1, qtdeItem }: any = useContext(OrderContext);

    function handleSelectWeight(id: number){
        setPeso(id);

        id && qtde ? setEnabled1(true) : setEnabled1(false);
    }

    return (
        <View style={[styles.cardContainer, styles.shadow]}>
            <View style={{flexDirection: 'row'}}>
                <View style={[styles.cardContent70]}>
                    <Text style={[styles.text, styles.size18]}>{title}</Text>
                </View>

                <View style={styles.cardContent30}>
                    <Text style={[styles.text, styles.size12, styles.margin8]}>R$</Text>
                    {
                        price.promotion === 1 ?
                        <Text style={[styles.bold, styles.size20]}>
                            {parseFloat(String(price.discount_price * qtde)).toFixed(2)}
                        </Text>
                        :
                        <Text style={[styles.bold, styles.size20]}>
                            {parseFloat(String(price.sale_price * qtde)).toFixed(2)}
                        </Text>
                    }
                </View>
            </View>

            <View style={[styles.contentBoxKg, styles.margin16]}>
                <Text style={[styles.text, styles.size16]}>Peso:</Text>
                
                <View style={{flexDirection: 'row'}}>
                    {
                        weight.map((item: any, i: number) => (
                            <TouchableOpacity 
                            key={String(i)}
                            style={[
                                styles.boxKg,
                                peso === item.weight ?
                                styles.bgSecondary :
                                styles.bgGray
                            ]}
                                onPress={() => handleSelectWeight(item.weight)}
                            >
                                <Text style={styles.white}>{item.weight}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>

            <View style={[styles.contentBoxKg, styles.margin16]}>
                <Text style={[styles.text, styles.size16]}>Quantidade:</Text>
                
                <View style={styles.contentInputQtde}>
                    <TouchableOpacity 
                        onPress={() => qtdeItem('remove')}
                    >
                        <Icon name="minus-circle" style={styles.icon} />
                    </TouchableOpacity>

                    <TextInput 
                        keyboardType="number-pad"
                        style={styles.input}
                        value={String(qtde)}
                        autoCorrect={false}
                        onChangeText={setQtde}
                    />

                    <TouchableOpacity 
                        onPress={() => qtdeItem('add')}
                    >
                        <Icon name="plus-circle" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}