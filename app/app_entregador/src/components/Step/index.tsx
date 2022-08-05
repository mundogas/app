import React from 'react';
import { 
    View, 
    Text, 
} from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { styles } from './styles';

type Props =  {
  step1: boolean,
  step2: boolean,
  step3: boolean,
}

export function Step({step1, step2, step3} : Props){
    return(
        <View style={styles.container}>
            <View style={styles.contentText}>
                {
                    step1 === true ?
                    <Icon name="circle" /> :
                    <Icon name="circle-o" />
                }
                <Text style={styles.text}>Pedido</Text>
            </View>

            <View style={styles.line}></View>

            <View style={styles.contentText}>
                {
                    step2 === true ?
                    <Icon name="circle" /> :
                    <Icon name="circle-o" />
                }
                <Text style={styles.text}>Pagamento</Text>
            </View>
            

            <View style={styles.line}></View>

            <View style={styles.contentText}>
                {
                    step3 === true ?
                    <Icon name="circle" /> :
                    <Icon name="circle-o" />
                }
                <Text style={styles.text}>Confirmação</Text>
            </View>
        </View>
    )
}