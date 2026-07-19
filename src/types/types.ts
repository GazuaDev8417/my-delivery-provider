export interface Restaurant {
  id: string;
  name: string;
  email: string;
  category: string;
  logourl: string;
  phone: string;
  address: string;
}

export interface Products{
    category:string
    description:string
    id:string
    name:string
    photoUrl:string
    price:number
    provider:string
}

export interface User{
    id:string
    username:string
    cpf:string
    email:string
    street:string
    number:string
    neighbourhood:string
    city:string
    state:string
    complement:string
}

export interface Order {
  id: string;
  product: string;
  price: string;
  moment: string;
  quantity: number;
  total: string;
  address: string;
  state: 'REQUESTED' | 'FINISHED' | string;
  paymentmethod?: string;
  client: string;
}

export interface GroupedProducts {
  state: string;
  items: Order[];
  total: number;
}