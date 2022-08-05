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
    title: string;
    subTitle: string | null;
    icon: any;
    arrow: boolean;
}

export function ListItemProfile({title, subTitle, icon, arrow, ...rest}: Props){
    return (
        <TouchableOpacity 
            style={[styles.containerText, !arrow && styles.border ]}
            {...rest}
            activeOpacity={.5}
        >
            <View style={[styles.contentText]}>
                <Icon name={icon} size={18} style={styles.iconColorGray} />
    
                <View style={{marginLeft: 10}}>
                    <Text style={styles.title}>{title}</Text>

                    {
                        subTitle &&
                        <Text style={styles.text}>{subTitle}</Text>
                    }
                </View>
            </View>
    
           {
               arrow &&
                <View>
                    <Icon name="arrow-right" size={18} style={styles.iconColorPrimary}/>
                </View>
           }
        </TouchableOpacity>
    )
}