import React from 'react';
import { Text, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

type Props = TouchableOpacityProps & {
  title: any;
  back: boolean;
}

export function Header({title, back, ...rest} : Props){

  const navigation = useNavigation();

  function handleNavigateToBack() {
    navigation.goBack();
  }

  return(
    <View style={styles.container}>
      <View style={styles.content}>
        {
          back ?
          <TouchableOpacity 
            onPress={handleNavigateToBack}
            style={styles.contentBack}
          >
            <Icon name="arrow-left" size={18} style={styles.icon}/>
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
          :
          <Text style={styles.title}>{title}</Text>
        }
      </View>
    </View>
  );
}