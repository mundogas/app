import { useNavigation } from '@react-navigation/native';
import { createContext, useState } from 'react';
import { useAxios } from '../hooks/useAxios';
import api from '../services/api';
import { useAuth } from '../services/auth';

export const AddressContext = createContext();

export function AddressContextProvider({children}: any) {
    const { user } = useAuth();
    const { data, mutate }: any = useAxios('cliente/meus-enderecos/' +user?.id);

    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [district, setDistrict] = useState('');
    const [complement, setComplement] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [cidade, setCidade] = useState('');
    const [cidadeID, setCidadeID] = useState('');

    const [loading, setLoading] = useState(false);

    function resetVars(){
        setName('');
        setType('');
        setAddress('');
        setNumber('');
        setDistrict('');
        setComplement('');
        setZipcode('');
        setCidade('');
        setCidadeID('');
    }

    async function handleCreate(){
        setLoading(true);

        let city = {
            cidade_id: cidadeID,
            cidade_name: {
                id: cidadeID,
                name: cidade,
            },
        }

       let submit = {
            name: name,
            type: type,
            address: address,
            number: number,
            district: district,
            complement: complement,
            zipcode: zipcode,
            cidade: city,
            cliente_id: user?.id
        }

        api.post('cliente/enderecos', submit).then((res: any) => {
            console.log(res.data);
        });

        setLoading(false);
        data.push(submit);
        //mutate(addAddress, false);
        resetVars();
        navigation.navigate('Address');
    }

    function handleUpdate(id: any){
        setLoading(true);

        let update = {
            name: name,
            type: type,
            address: address,
            number: number,
            district: district,
            complement: complement,
            zipcode: zipcode,
            cliente_id: user?.id
        }
        
		//requisição a api aqui
        api.put('cliente/enderecos/'+id, update).then((res: any) => {
            console.log(res.data);
            setLoading(false);
        });

		let updatedAddress = data?.map((dt: any) => {
			if(dt.id === id){
				return {...dt, name, type, address, number, district, complement, zipcode};
			}
			return dt;
		});
		
		mutate(updatedAddress, false);
        resetVars();

        navigation.navigate('Address');
	}

	async function handleDelete(id: any){
        let del = await api.delete('cliente/enderecos/' +id);
      
		let deletar = data?.filter((dt: any) => dt.id !== id);
		mutate(deletar, false);
      
        navigation.navigate('Address');
	}

    return (
        <AddressContext.Provider 
            value={{
                data,
                handleUpdate,
                handleCreate,
                handleDelete,
                resetVars,
                loading, setLoading,
                name, setName,
                type, setType,
                address, setAddress,
                number, setNumber,
                district, setDistrict,
                complement, setComplement,
                zipcode, setZipcode,
                cidade, setCidade,
                cidadeID, setCidadeID,
            }}
        >
            {children}
        </AddressContext.Provider>
    )


}