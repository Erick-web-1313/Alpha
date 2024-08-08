import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateProductDto } from "../models/CreatProductDto.model";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Product } from "../models/ProductDTO.model";
import { UpdateProductDto } from "../models/UpdateProductDtio.model";

@Injectable({
    providedIn: 'root'
  })
  export class ProductDtoService{
    readonly urlApi = environment.urlApi;
    constructor(private http: HttpClient) { }

    public criarProduto(createProductDto: CreateProductDto) {
      return this.http.post<any>(`${this.urlApi}products/create-product`, createProductDto);
  }
    public ObterProdutos(){
        return this.http.get<any>(`${this.urlApi}products/get-all-products`);
    }
    public buscarUmProduto(id: string): Observable<Product> {
      return this.http.get<Product>(`${this.urlApi}products/get-one-product/${id}`);
    }
    public atualizarProduto(idProduct: number, updateProductDto: UpdateProductDto) {
      return this.http.patch(`${this.urlApi}products/update-product/${idProduct}`, updateProductDto);
    }
    public excluirProduto(idProduct: number){
       return this.http.delete<any>(`${this.urlApi}products/delete-product/${idProduct}`,);
    }
  }