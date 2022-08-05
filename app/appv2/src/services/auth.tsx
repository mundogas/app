import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import api from './api';

export interface User {
  id: number;
  name: string;
  name_array: any;
  email: string;
  phone: string,
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  //loadingSession: boolean;
  signIn(email: string, password: string): void;
  signOut(): void;
  updateUser(id: number, name: string, name_array: any, email: string, phone: string): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingSession, setLoadingSession] = useState(false);

  useEffect(() => {  
    if(!user){
      //verificaTokenUser();
    }
  });

  // async function verificaTokenUser(){
  //   const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
  //   const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

  //   if(storagedToken && storagedUser){
  //     api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

  //     api.get(`auth/token`).then(async res => {
  //       if(res.data === true){
  //         loadStorageData();
  //         return;
  //       }
  //       else{
  //         await AsyncStorage.clear();
  //         setLoadingSession(false);
  //         //Alert.alert('Sessão expirada. Faça login novamente');
  //         return;
  //       }
  //     }).catch(err => {
  //       Alert.alert('Não foi possível autenticar o usuário, tente novamente.');
  //       return;
  //     });

  //     //setLoading(false);
  //   }
    
  // }

  async function loadStorageData() {
    setLoadingSession(true);
    
    const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
    const storagedToken = await AsyncStorage.getItem('@RNAuth:token');
  
    if(storagedUser && storagedToken && !user) {
      setUser(JSON.parse(storagedUser));

      api.defaults.headers = {
        'Authorization': 'Bearer ' + storagedToken
      }

      setLoadingSession(false);
    }
  }

  async function signIn(email: string, password: string) {
    setLoading(true);
    api.defaults.headers = {};
    
    try {
     api.post('auth/cliente/login', {email: email, password: password}).then(async (user: any) => {
        api.defaults.headers = {
          'Authorization': 'Bearer ' + user.data.data.token
        }
        console.log(user.data.data.token);
        await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(user.data.data.user));
        await AsyncStorage.setItem('@RNAuth:token', user.data.data.token);

        setUser(user.data.data.user);
        setLoading(false);
      }).catch(err => {
        console.log(err);
    
        Alert.alert('Não foi possível autenticar o usuário, tente novamente.');
        setLoading(false);
      });
    }
    catch {
      setLoading(false);
      return;
    }

  }

  function updateUser(id: number, name: string, name_array: any, email: string, phone: string){
    let user = {
      id: id,
      name: name,
      name_array: name_array,
      email: email,
      phone: phone,
    }

    setUser(user);
  }

  async function signOut() {
    let token = await AsyncStorage.getItem('@RNAuth:token');

    await api.post(`auth/cliente/logout/${user?.id}`, token).then(async res => { 
      console.log(res.data);
    });

    await AsyncStorage.clear();
    api.defaults.headers = {};
    console.log(api.defaults.headers);
    setUser(null);
  }

  // loadingSession
  return (
    <AuthContext.Provider
      value={{signed: !!user, user, loading, signIn, signOut, updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export {AuthProvider, useAuth};