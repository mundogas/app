import React from "react";
import { 
    TouchableOpacity, 
    TouchableOpacityProps,
    View, 
    Text 
} from "react-native";
import { Feather as Icon } from '@expo/vector-icons';
import { styles } from './styles';

type Props = TouchableOpacityProps & {
    name: string;
    address: string;
    number: string;
    district: string;
    cidade_name: string;
}

export function ListItemAddress({name, address, number, district, cidade_name, ...rest}: Props){
    return (
        <TouchableOpacity 
            style={styles.containerText}
            {...rest}
            activeOpacity={.5}
        >
            <View style={[styles.contentText]}>
                <Icon name="map-pin" size={18} style={styles.iconColorGray} />

                <View style={{marginLeft: 10}}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.text}>Rua {address}, {number}</Text>
                    <Text style={styles.text}>Bairro: {district}</Text>
                    <Text style={styles.text}>Cidade: {cidade_name}</Text>
                </View>
            </View>

            <View>
                <Icon name="arrow-right" size={18} style={styles.iconColorPrimary}/>
            </View>
        </TouchableOpacity>
    )
}