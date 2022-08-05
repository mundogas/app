import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import { useAxios } from "../../../hooks/useAxios";

type Props = {
    id: number; //id da cidade, para buscar os produtos
}

export function ContentItemsShop({id, ...rest} : Props){
    /*===============VARIÁVEIS DE CONTROLE ===================*/
    const navigation = useNavigation();
    const { data } = useAxios('cliente/produtos/' +id);

    /*===============FUNÇÕES DE NAVEGAÇÃO ===================*/
    function handleNavigateToOrderStep1(item: any) {
        navigation.navigate('OrderStep1', {data: item});
    }

    return (
        <View style={styles.main}>
            {
                data?.map((item: any, i: number) => (
                    <TouchableOpacity 
                        key={String(i)} 
                        style={[styles.cardContainer, styles.shadow]}
                        activeOpacity={.5}
                        onPress={() => handleNavigateToOrderStep1(item)}
                    >
                        <View style={[styles.cardContent70]}>
                            <Text style={[styles.text, styles.size18]}>{item.name}</Text>
                            <Text style={[styles.text, styles.size12]}>Disponível em:</Text>
                            
                            <View style={styles.contentBoxKg}>
                                {
                                    item.peso.map((peso: any, index: number) => (
                                        <View 
                                        key={String(index)}
                                            style={styles.boxKg}
                                        >
                                            <Text style={styles.white}>{peso.weight}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>

                        <View style={styles.cardContent30}>
                            <Text style={[styles.text, styles.size12, styles.margin8]}>R$</Text>

                            {
                                item.preco.promotion === 1 ?
                                <Text style={[styles.bold, styles.size20]}>
                                    {item.preco.discount_price}
                                </Text>
                                :
                                <Text style={[styles.bold, styles.size20]}>
                                    {item.preco.sale_price}
                                </Text>
                            }
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}