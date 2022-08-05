import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from "../services/auth";

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

export function Routes(){
  const { signed } = useAuth();
  
  return(
    <NavigationContainer>
     { signed ? <AppRoutes /> : <AuthRoutes /> }
    </NavigationContainer>
  )
}