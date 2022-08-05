import { useNavigation } from '@react-navigation/native';
import { createContext, useContext, useState } from 'react';
import { useAxios } from '../hooks/useAxios';
import api from '../services/api';
import { useAuth } from '../services/auth';
import { OrderHistoryContext } from './OrderHistoryContext';

export const OrderDeliveryContext = createContext();

export function OrderDeliveryContextProvider({children}: any) {
	const { user } = useAuth();
    const { data, mutate }: any = useAxios('entregador/pedidos/' +user?.id);
    //const { teste, handleMutateData }: any = useContext(OrderHistoryContext);
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [enabledStep1, setEnabledStep1] = useState(false);

    //Essa função é para atribuir o dado mutate à orderstep1
    function handleDataStep1(id: any){
        let updated = data?.map((dt: any) => {
            if(dt.id === id){
                return {...dt};
            }
        });
      
        return updated[0];
    }

    function handleStatusCaminho(item: any){
        setLoading(true);

        let status = {
            status: 'À caminho'
        }

        api.put('entregador/status/' +item.id, status).then(() => {
            let updated = data?.map((dt: any) => {
                if(dt.id === item.id){
                    return {...dt, status: 'À caminho'};
                }
                return dt;
            });
    
            mutate(updated, false);

            setLoading(false);
        });        
    }

    function handlePedidoEntregue(item: any){
        setLoading(true);

        let status = {
            status: 'Entregue'
        }

        //console.log(teste)
        
        api.put('entregador/status/' +item.id, status).then(() => {
            setLoading(false);

            //handleMutateData(item);

            let deletar = data?.filter((dt: any) => dt.id !== item.id);
		    mutate(deletar, false);

            navigation.navigate('Home');
        });
    }

    return (
        <OrderDeliveryContext.Provider
            value={{
                data,
                handleDataStep1,
                handlePedidoEntregue,
                handleStatusCaminho,
                loading, setLoading,
                enabledStep1, setEnabledStep1
            }}
        >
            {children}
        </OrderDeliveryContext.Provider>
    )
}