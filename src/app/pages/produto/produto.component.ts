import { Component, OnInit } from '@angular/core';
import { ProductDtoService } from '../../services/productDto.service';
import { Product } from '../../models/ProductDTO.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalExcluirComponent } from '../../components/modal-excluir/modal-excluir.component';
import { FormProdutoComponent } from '../../components/form-produto/form-produto.component';
import { NavigationExtras, Router } from '@angular/router';
import { Token } from '../../models/token';

@Component({
  selector: 'app-dashboard',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  token: Token | null = null;
  listaObterTodos: Product[] = [];
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'preco', 'estoque','detalhe', 'editar', 'excluir'];
  dataSource = new MatTableDataSource<Product>(this.listaObterTodos);
  totalRegistros: number = 0;
  mostrarModal: boolean = false;
  
  constructor(public dialog: MatDialog, private productDtoService: ProductDtoService, private router: Router) { }

  ngOnInit(): void {
    this.obterTodos();
  }

  excluir(id: number) {
    console.log("ID", id);
    const dialogRef = this.dialog.open(ModalExcluirComponent, {
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogCadastro(product?: Product) {
    const dialogRef = this.dialog.open(FormProdutoComponent, {
      data: product
    });
  }

  openDetalhe(product: Product): void {
    this.router.navigate(['/detalhe', product.id]);
  }
  

  filtrarProdutos(event: Event) {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }  

  obterTodos() {
    this.productDtoService.ObterProdutos().subscribe({
      next: (response: any) => {
        this.listaObterTodos = response.data.products;
        this.totalRegistros = this.listaObterTodos.length;
        this.dataSource.data = this.listaObterTodos;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  confirmarSair() {
    localStorage.removeItem('token');
    window.location.href = ''; // Redirecionar para a página inicial ou página desejada
  }

}
