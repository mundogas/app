import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Start } from '../screens/_auth/Start';
import { SignIn } from '../screens/_auth/SingIn';
import { Register_1 } from '../screens/_auth/Register_1';
import { Register_2 } from '../screens/_auth/Register_2';
import { Register_3 } from '../screens/_auth/Register_3';

//import { ForgotPassword } from '../screens/_auth/ForgotPassword';

const Stack = createStackNavigator();

export function AuthRoutes() {
  
  return(
    <Stack.Navigator screenOptions={{
      headerShown: false,
      headerMode: 'screen'
    }}>
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Register_1" component={Register_1} />
      <Stack.Screen name="Register_2" component={Register_2} />
      <Stack.Screen name="Register_3" component={Register_3} />
      {/* <Stack.Screen name="Forgot" component={ForgotPassword} /> */}
    </Stack.Navigator>
  );
}
