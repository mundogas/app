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
import { ChangeAddress } from '../screens/_profile/ChangeAddress';
import { Address } from '../screens/_profile/Address';
import { OrderStep1 } from '../screens/_home/OrderStep1';
import { AddressContextProvider } from '../contexts/AddressContext';
import { SocialMedia } from '../screens/_profile/SocialMedia';
import { SendFeedback } from '../screens/_orderhistory/SendFeedback';
import { OrderContextProvider } from '../contexts/OrderContext';
import { OrderStep2 } from '../screens/_home/OrderStep2';
import { OrderStep3 } from '../screens/_home/OrderStep3';
import { OrderConfirmed } from '../screens/_home/OrderConfirmed';
import { OrderPayment } from '../screens/_home/OrderPayment';

const HomeNavigator = createStackNavigator();
const PerfilNavigator = createStackNavigator();
const OrderNavigator = createStackNavigator();
const AddressNavigator = createStackNavigator();
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
        tabBarStyle: { paddingTop: 5, paddingBottom: 5 },
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
    <OrderContextProvider>
      <HomeNavigator.Navigator
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
        }}
      >
        <HomeNavigator.Screen name="Home" component={Home} />
        <HomeNavigator.Screen name="OrderStep1" component={OrderStep1} />
        <HomeNavigator.Screen name="OrderStep2" component={OrderStep2} />
        <HomeNavigator.Screen name="OrderStep3" component={OrderStep3} />
        <HomeNavigator.Screen name="OrderConfirmed" component={OrderConfirmed} />
        <HomeNavigator.Screen name="OrderPayment" component={OrderPayment} />
      </HomeNavigator.Navigator>
    </OrderContextProvider>
  )
}

function OrderHistoryScreen(){
  return (
    <OrderContextProvider>
      <OrderNavigator.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}
      >
        <OrderNavigator.Screen name="OrderHistory" component={OrderHistory} />
        <OrderNavigator.Screen name="ViewOrder" component={ViewOrder} />
        <OrderNavigator.Screen name="SendFeedback" component={SendFeedback} />
      </OrderNavigator.Navigator>
    </OrderContextProvider>
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
      <PerfilNavigator.Screen name="AddressScreen" component={AddressScreen} />
      <PerfilNavigator.Screen name="SocialMedia" component={SocialMedia} />
    </PerfilNavigator.Navigator>
  )
}

function AddressScreen() {
  return (
    <AddressContextProvider>
      <AddressNavigator.Navigator
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
        }}
      >
        <AddressNavigator.Screen name="Address" component={Address} />
        <AddressNavigator.Screen name="ChangeAddress" component={ChangeAddress} />
      </AddressNavigator.Navigator>
    </AddressContextProvider>
  )
}

