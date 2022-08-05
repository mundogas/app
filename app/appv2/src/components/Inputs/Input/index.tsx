import React from "react";
import { 
    View, 
    Text,
    TextInput,
    TextInputProps,
} from "react-native";
import { styles } from './styles';

type Props = TextInputProps & {
    title: string;
    placeholder: string;
    width: string;
}

export function Input({title, placeholder, width, ...rest}: Props){
    return (
        <View style={
            [styles.containerText, 
                width == '30' ? styles.input30 : width === '60' ? styles.input60 : {} 
            ]}>

            <View style={[styles.contentText]}>
                <View>
                    <Text style={styles.text}>{title}</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder={placeholder}
                        {...rest}
                    />
                </View>
            </View>
        </View>
    )
}