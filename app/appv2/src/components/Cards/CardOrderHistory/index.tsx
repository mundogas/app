import React from "react";
import { 
    View, 
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";
import { styles } from './styles';

type Props = TouchableOpacityProps & {
    title: any;
    status: string;
    date: any;
    price: string;
    platform_payment: string;
    payment_method: string;
}

export function CardOrderHistory({title, status, date, price, platform_payment, payment_method, ...rest}: Props){
    return (
        <TouchableOpacity 
        style={[styles.cardContainer, styles.shadow]}
        activeOpacity={.5}
        {...rest}
        >
            <View style={styles.cardContent}>
                <Text style={[styles.text, styles.size16]}>Pedido #{title}</Text>

                <View style={[styles.boxStatus]}>
                    <Text style={[styles.white, styles.size12]}>{status}</Text>
                </View>
            </View>

            <View style={styles.margin8}>
                {
                    platform_payment === 'app' ?
                    <Text style={[styles.text, styles.size12]}>No {payment_method}, pelo {platform_payment}</Text>
                    :
                    <Text style={[styles.text, styles.size12]}>No {payment_method}, na {platform_payment}</Text>
                }
            </View>

            <View style={[styles.cardContent, styles.margin8]}>
                <Text style={[styles.text, styles.size14, styles.bold]}>{date}</Text>

                <Text style={[styles.text, styles.size14, styles.bold]}>R${price}</Text>
            </View>
        </TouchableOpacity>
    )
}