import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '../screens/_auth/SingIn';
//import { ForgotPassword } from '../screens/_auth/ForgotPassword';

const Stack = createStackNavigator();

export function AuthRoutes() {
  
  return(
    <Stack.Navigator screenOptions={{
      headerShown: false,
      headerMode: 'screen'
    }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      {/* <Stack.Screen name="Forgot" component={ForgotPassword} /> */}
    </Stack.Navigator>
  );
}
