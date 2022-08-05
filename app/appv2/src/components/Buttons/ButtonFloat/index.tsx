import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import { styles } from './styles';
import { theme } from '../../../global/styles/theme';


export function ButtonFloat({ ...rest }){
  return(
    <TouchableOpacity 
      style={styles.content} 
      activeOpacity={0.92} 
      {...rest}
    >
      <Icon name="plus" size={24} color={theme.colors.white} />
    </TouchableOpacity>
  );
}