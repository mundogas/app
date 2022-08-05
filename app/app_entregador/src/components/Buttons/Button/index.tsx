import React from 'react';
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';

type Props = RectButtonProps & {
  title: string;
  enabled: boolean;
  color: any;
}

export function Button({ title, enabled, color, ...rest } : Props){
  return(
    <RectButton 
      style={[styles.container, 
        enabled && color === 'primary' ? styles.primary 
        : !enabled && color === 'primary' ? styles.disabledPrimary 
        : enabled && color === 'red' ? styles.red
        : styles.disabledRed
      ]}
      {...rest}
      enabled={enabled}
    >
      <Text style={styles.title}>
        { title }
      </Text>
    </RectButton>
  );
}