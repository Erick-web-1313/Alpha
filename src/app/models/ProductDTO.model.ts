export interface ProductDto {
    data: Data;
    message: any
    success: boolean
}
export interface Data {
    products: Product[];
}
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
}

