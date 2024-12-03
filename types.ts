export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
};

export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
};

export enum SalesStatus {
    SLOW,
    FAST
};

export interface Product {
    id: string;
    category: Category;
    name: string;
    price: number;
    stock: number;
    salesStatus: SalesStatus
    isFeatured: boolean;
    sizes: Size[];
    colors: Color[];
    images: Image[];
};

export interface Size {
    id: string;
    name: string;
    value: string;
};

export interface Color {
    id: string;
    name: string;
    value: string;
};

export interface Image {
    id: string;
    url: string;
};

export type Order = {
    id: string
    phone: string
    address: string
    email: string
    name: string
    userId:string
    isPaid: boolean
    totalPrice: string
    products: string
    createdAt: string
  }

export type Payment = {
    orderId: string,
    email: string,
    phone?: string,
    address?: string,
    name: string,
    date?: string,
    amount?: number,
    imageSrc?: string
}