import React from 'react';
import { Text, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import { styles } from './styles';
import { theme } from '../../../global/styles/theme';

type Props = TouchableOpacityProps &{
  title: string;
}

export function ButtonNavigate({ title, ...rest } : Props){
  return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.content} {...rest}>
          <Icon name="arrow-left" size={20} color={theme.colors.subTitle} />
          <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}