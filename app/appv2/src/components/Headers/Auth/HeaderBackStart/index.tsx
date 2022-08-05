import React from 'react';
import { Text, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
}

export function HeaderBackStart({title, ...rest} : Props){

  const navigation = useNavigation();

  function handleNavigateToEntrada() {
    // navigation.navigate('Start');
    navigation.goBack();
  }

  return(
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={{marginTop: 24}} onPress={handleNavigateToEntrada}>
          <Icon size={20} name="arrow-left" color="white"  />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
    
  );
}