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
}

export function TextArea({title, placeholder, ...rest}: Props){
    return (
        <View style={styles.containerText}>
            <View style={[styles.contentText]}>
                <View>
                    <Text style={styles.text}>{title}</Text>
                    <TextInput 
                        multiline={true}
                        numberOfLines={4}
                        style={styles.input}
                        placeholder={placeholder}
                        {...rest}
                    />
                </View>
            </View>
        </View>
    )
}