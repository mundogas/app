export interface User {
  id: number,
  name: string,
  email: string,
  created_at: string
}

export interface Imagem {
	id: number,
	name: string,
	path: string,
}

export interface Produto {
  id: number,
  name: string,
  sale_price: string,
  discount_price: string,
  promotion: boolean,
  ativo: boolean
}

export interface Cidade {
	id: number,
	name: string,
	ativo: string,
}

export interface Pedido {
  id: number,
  entregador: object,
  cliente: object,
  date_hour: string,
  status: string,
  platform_payment: string,
  payment_method: string,
}

export interface ViewCidade {
  disabled: boolean,
}

export interface ProdutoCidade {
  cidade_id: number,
  sale_price: string,
  discount_price: string,
  promotion: boolean,
  cidade_name: string,
}

export interface ProdutoCidadeUpdate {
  cidade_id: number,
  sale_price: string,
  discount_price: string,
  promotion: boolean,
  cidade_name: string,
  id: number,
  open: boolean,
}
