export interface InputCreateProductDto {
  tipo: string;
  name: string;
  price: number;
}

export interface OutputCreateProductDto {
  id: string;
  name: string;
  price: number;
}
