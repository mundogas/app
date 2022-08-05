import React from "react";
import { 
    View, 
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    TouchableOpacityProps
} from "react-native";
import { Feather as Icon } from '@expo/vector-icons';
import { styles } from './styles';

type Props = TextInputProps & {
    title: string;
    placeholder: string;
    icon: any;
    eye: boolean;
}

export function InputIcon({title, placeholder, icon, eye, ...rest}: Props){
    return (
        <View style={styles.containerText}>
            <View style={[styles.contentText]}>
                <Icon name={icon} size={18} style={styles.iconColorGray} />

                <View style={{marginLeft: 10}}>
                    <Text style={styles.text}>{title}</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder={placeholder}
                        autoCorrect={false}
                        {...rest}
                    />
                </View>

                {/* {
                    eye &&
                    <TouchableOpacity 
                        {...props}
                    >
                        <Icon name="eye" size={20} style={styles.iconColorPrimary}/>
                    </TouchableOpacity>
                } */}
            </View>
        </View>
    )
}