import { createContext } from 'react';
import { useAxios } from '../hooks/useAxios';
import { useAuth } from '../services/auth';

export const OrderHistoryContext = createContext({});

export function OrderHistoryContextProvider({children}: any) {
	const { user } = useAuth();
    const { data, mutate }: any = useAxios('entregador/entregues/' +user?.id);

    //Verificar a possibilidade de fazer de um jeito mais pratico
    //const teste = 'ola';

    function handleMutateData(item: any){
        console.log(item)
       
        //data.push(item);
    }

    return (
        <OrderHistoryContext.Provider
            value={{
                data,
                //teste,
                handleMutateData
            }}
        >
            {children}
        </OrderHistoryContext.Provider>
    )
}