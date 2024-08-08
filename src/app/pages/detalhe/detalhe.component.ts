import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDtoService } from '../../services/productDto.service';
import { Product } from '../../models/ProductDTO.model';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {
  produto: any;
  listaObterTodos: Product[] = [];
  constructor(private route: ActivatedRoute, private productDtoService: ProductDtoService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.loadProductDetails(productId);
      } else {
        console.error('Nenhum ID de produto encontrado na rota.');
      }
    });
  }
  
  loadProductDetails(id: string) {
    this.productDtoService.buscarUmProduto(id).subscribe({
      next: (response: any) => {
        console.log('Resposta da API:', response);
        if (response.success && response.data && response.data.product) {
          this.produto = response.data.product;
          console.log('Produto:', this.produto);
        } else {
          console.error('Produto não encontrado na resposta.');
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
  
  

  voltar() {
    window.location.href = '/produto';
  }
}
