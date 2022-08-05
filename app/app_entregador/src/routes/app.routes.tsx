import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome as Icon } from '@expo/vector-icons';

import { Home } from '../screens/Home';

import { OrderHistory } from '../screens/OrderHistory';
import { ViewOrder } from '../screens/_orderhistory/ViewOrder';

import { Profile } from '../screens/Profile';
import { PersonalInformation } from '../screens/_profile/PersonalInformation';
import { ChangePassword } from '../screens/_profile/ChangePassword';

import { OrderStep1 } from '../screens/_home/OrderStep1';
import { OrderStep2 } from '../screens/_home/OrderStep2';

import { OrderHistoryContextProvider } from '../contexts/OrderHistoryContext';
import { OrderDeliveryContextProvider } from '../contexts/OrderDeliveryContext';

const HomeNavigator = createStackNavigator();
const PerfilNavigator = createStackNavigator();
const OrderNavigator = createStackNavigator();
const Tab = createBottomTabNavigator();

export function AppRoutes() {
  return(
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Comprar') {
            iconName = focused
              ? 'fire' : 'fire';
          } else if (route.name === 'Histórico') {
            iconName = focused ? 'history' : 'history';
          }
          else if (route.name === 'Perfil') {
            iconName = focused ? 'user' : 'user';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#EF761D',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { marginVertical: 10 },
      })}
    >
      <Tab.Screen options={{
        headerShown: false,
      }} name="Comprar" component={HomeScreen} />

      <Tab.Screen options={{
        headerShown: false,
      }} name="Histórico" component={OrderHistoryScreen} />

      <Tab.Screen options={{
        headerShown: false,
      }} name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

function HomeScreen(){
  return (
    <OrderDeliveryContextProvider>
      <HomeNavigator.Navigator
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
        }}
      >
        <HomeNavigator.Screen name="Home" component={Home} />
        <HomeNavigator.Screen name="OrderStep1" component={OrderStep1} />
        <HomeNavigator.Screen name="OrderStep2" component={OrderStep2} />
      </HomeNavigator.Navigator>
    </OrderDeliveryContextProvider>
  )
}

function OrderHistoryScreen(){
  return (
    <OrderHistoryContextProvider>
      {/* <OrderDeliveryContextProvider> */}
          <OrderNavigator.Navigator
          screenOptions={{
            gestureEnabled: false,
            headerShown: false,
          }}
          >
            <OrderNavigator.Screen name="OrderHistory" component={OrderHistory} />
            <OrderNavigator.Screen name="ViewOrder" component={ViewOrder} />
          </OrderNavigator.Navigator>
      {/* </OrderDeliveryContextProvider> */}
    </OrderHistoryContextProvider>
  )
}

function PerfilScreen() {
  return (
    <PerfilNavigator.Navigator 
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
    }}
    >
      <PerfilNavigator.Screen name="Profile" component={Profile} />
      <PerfilNavigator.Screen name="PersonalInformation" component={PersonalInformation} />
      <PerfilNavigator.Screen name="ChangePassword" component={ChangePassword} />
    </PerfilNavigator.Navigator>
  )
}


