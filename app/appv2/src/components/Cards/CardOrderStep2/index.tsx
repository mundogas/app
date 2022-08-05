import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

type Props =  {
  title: string;
  price: any;
  weight: string;
  qtde: number;
}

export function CardOrderStep2({title, price, qtde, weight} : Props){
    return (
        <View style={[styles.cardContainer, styles.shadow]}>
            <View style={styles.contentQtde}>
                <Text style={styles.textQtde}>{qtde}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
                <View style={[styles.cardContent70]}>
                    <Text style={[styles.title]}>{title}</Text>
                </View>

                <View style={styles.cardContent30}>
                    <Text style={[styles.p, styles.margin8]}>R$</Text>
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

            <View style={[styles.contentBoxKg]}>
                <Text style={styles.subTitle}>{weight}, 20 - 40m</Text>
            </View>
        </View>
    )
}