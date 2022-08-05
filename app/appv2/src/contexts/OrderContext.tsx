import { CommonActions, useNavigation } from '@react-navigation/native';
import { createContext, useState } from 'react';
import { useAxios } from '../hooks/useAxios';
import api from '../services/api';
import { useAuth } from '../services/auth';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/esm/locale/pt/index.js';

export const OrderContext = createContext();

export function OrderContextProvider({children}: any) {
	const { user } = useAuth();
    const { data, mutate }: any = useAxios('cliente/historico/' +user?.id);
    const navigation = useNavigation();

    const [cidadeID, setCidadeID] = useState<any>();
	const [select, setSelect] = useState<any>();
    const [endereco, setEndereco] = useState<any>();

    //Step1
    const [dicas, setDicas] = useState<any>();
    const [peso, setPeso] = useState<any>();
    const [qtde, setQtde] = useState(1);
    const [total, setTotal] = useState<any>();

    //Step2
    const [metodoPagamento, setMetodoPagamento] = useState<any>();
    const [plataformaPagamento, setPlataformaPagamento] = useState<any>();

    //Step3
    const [loading, setLoading] = useState(false);
    const [CPF, setCPF] = useState<any>();

    const [enabled1, setEnabled1] = useState(false);
    const [enabled2, setEnabled2] = useState(false);
    const [enabled3, setEnabled3] = useState(false);
    const [enabledPayment, setEnabledPayment] = useState(false);

    //OrderPayment
    const [qrcode, setQrCode] = useState('');
    const [link, setLink] = useState('');

    //Feedback
    const [loadingFeedback, setloadingFeedback] = useState(false);

    //Home
    function handleCidadeID(item: any, data: any){
        data.map((endereco: any) => {
            if(endereco.id === item){
                setEndereco(endereco);
                setCidadeID(endereco.cidade.cidade_id);
                setSelect(endereco.id);
            }
        });
	}

	async function handleData(data: any){
        if(data && data.length){
            setEndereco(data[0]);
            setCidadeID(data[0].cidade.cidade_id);
            setSelect(data[0].id);
        }
	}

    //Step1
    function qtdeItem(action: string){
        if(action === 'add'){
            if(qtde != 10){
                setQtde(Number(qtde) + 1);
            }
        }
        else {
            if(qtde != 1){
                setQtde(Number(qtde) - 1);
            }
        }
    }

    function handlePaymentApp(data: any){
        setLoading(true);

        //Total do pedido
        let value = data.preco.promotion === 1 ? data.preco.discount_price : data.preco.sale_price;
        let total = parseFloat(String(value * qtde)).toFixed(2);

        let newOrder = {
            total: Number(total),
            cpf: CPF,
            firstName: user?.name_array[0],
            lastName: user?.name_array[1],
            phone: user?.phone,
            email: user?.email
        };
      
        api.post('cliente/pagamento', newOrder).then((res: any) => {
            console.log(res.data);

            handleNewOrder(data, res.data);
        });
    }

    const [timer, setTimer] = useState<any>();

    function handleStatusOrder(id: number, order: any){
        // setTimeout(() => {
        //     setEnabledPayment(false);
        // }, 1000);

        
        api.get('cliente/pagamento/status/' +id).then((res: any) => {
            console.log(res.data.status, id)
            if(res.data.status === 'created') return

            if(res.data.status === 'expired'){
                setEnabledPayment(false);
                handleChangeStatusOrder(order.id);
                return;
            }
            
            if(res.data.status === 'paid'){
                navigation.navigate('OrderConfirmed');
                setEnabledPayment(false);
                return;
            }
        });
    }

    //Alterar status do pedido
    async function handleChangeStatusOrder(id: number){
        let newStatus = {
            status: 'Cancelado'
        }

        api.put('cliente/pedido/status/' +id, newStatus).then((res: any) => {
            console.log(res.data);
        });
    }

    //Novo pedido
    async function handleNewOrder(item: any, payment: any) {
        setLoading(true);

        //Total do pedido
        let value = item.preco.promotion === 1 ? item.preco.discount_price : item.preco.sale_price;
        let total = parseFloat(String(value * qtde)).toFixed(2);

        //Data e hora de agora
        let now: any = new Date();
        let date = format(now, "yyyy'-'MM'-'dd HH:mm:ss", { locale: pt });

        let itens = [{
            produto_id: item.id,
            weight_product: peso,
            qtde: qtde,
            value: value,
            name_produto: {
                id: item.id,
                name: item.name,
            },
        }]

        let addOrder = {
            cliente_id: user?.id,
            endereco_id: endereco.id,
            date_hour: date,
            total: total,
            payment_method: metodoPagamento,
            platform_payment: plataformaPagamento,
            status: 'Em processamento',
            dicas: !dicas ? null : dicas,
            itens: itens,
            entregador: null,
            entregador_id: null,
            feedback: null,
        }
      
        api.post('cliente/pedidos', addOrder).then((res: any) => {
            console.log(res.data);

            let array = [addOrder, ...data];
            mutate(array, false);
            setLoading(false);
            
            if(plataformaPagamento === 'entrega'){
                navigation.navigate('OrderConfirmed');
            }
            else {
                setEnabledPayment(true);
                navigation.navigate('OrderPayment', {data: item, payment: payment, order: res.data.data});
            }

            resetarVars();
        });
    }

    function resetarVars(){
        setPeso(null);
        setEnabled1(false);
        setEnabled2(false);
        setQtde(1);
        //setTotal('');
        setMetodoPagamento(null);
        setDicas(null);
    }

    //Feedback
    async function sendFeedbackOrder(addFeedback: any){
        setloadingFeedback(true);

		api.post('cliente/feedback', addFeedback).then((res: any) => {
            console.log(res.data);
            
            let updatedAddress = data?.map((dt: any) => {
                if(dt.id === addFeedback.pedido_id){
                    return {...dt, feedback: addFeedback};
                }
                return dt;
            });
            
            console.log(updatedAddress);
    
            mutate(updatedAddress, false);
    
            setloadingFeedback(false);
    
            //Reseta a pilha
            navigation.reset({
                index: 0,
                routes: [{name: 'OrderHistory'}],
            });

            setloadingFeedback(false);
        })
        
	}

    return (
        <OrderContext.Provider
            value={{
                data,
                handleCidadeID, 
                handleData,
                qtdeItem,
                handleNewOrder,
                handlePaymentApp,
                sendFeedbackOrder,
                handleStatusOrder,
                loading, setLoading,
                cidadeID, setCidadeID,
                select, setSelect,
                endereco, setEndereco,
                dicas, setDicas,
                peso, setPeso,
                enabled1, setEnabled1,
                enabled2, setEnabled2,
                enabled3, setEnabled3,
                timer, setTimer,
                enabledPayment, setEnabledPayment,
                loadingFeedback, setloadingFeedback,
                qtde, setQtde,
                total, setTotal,
                metodoPagamento, setMetodoPagamento,
                plataformaPagamento, setPlataformaPagamento,
                CPF, setCPF,
                qrcode,
                link
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}