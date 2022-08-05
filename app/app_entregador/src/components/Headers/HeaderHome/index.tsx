import React from 'react';
import { Text, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import { styles } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
}

export function HeaderHome({title, ...rest} : Props){
  return(
    <View style={[styles.container]}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.boxHeader} {...rest}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* <View style={styles.headerTop}>
    <Text style={[styles.text, styles.size12]}>Gostou do app? <Text style={styles.strong}>Compartilhe</Text></Text>
    <Icon size={20} name="send" color="#EF761D"  />
  </View> */

/* <View style={[styles.headerBottom]}>
  <View>
    <Text style={[styles.text, styles.size12]}>Entregar em:</Text>
    <Text style={[styles.text, styles.size16]}>Avenida Pres. Kennedy, 123</Text>
    <Text style={[styles.text, styles.size14]}>Ocian, Praia Grande</Text>
  </View>

  <View style={styles.headerBottomRight}>
    <Icon size={20} name="map-pin" color="#EF761D"  />
    <Text style={
      [styles.text, styles.size12, 
      styles.strong, styles.uppercase]}>Alterar</Text>
  </View>
</View> */