import { Product } from './../../models/ProductDTO.model';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDtoService } from '../../services/productDto.service';
import { CreateProductDto } from '../../models/CreatProductDto.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateProductDto } from '../../models/UpdateProductDtio.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrl: './form-produto.component.css'
})
export class FormProdutoComponent {
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productDtoService: ProductDtoService,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private dialogRef: MatDialogRef<any>,
    private _snackBar: MatSnackBar
  ) {
    this.formulario = this.formBuilder.group({
      id: [data ? data.id : ''],
      nome: [data ? data.name : '', [Validators.required]],
      descricao: [data ? data.description : '', [Validators.required]],
      preco: [data ? data.price : '', [Validators.required]],
      estoque: [data ? data.stock : '', [Validators.required]],
    });
  }

  adicionar() {
    if (this.formulario.valid) {
      const ProductDto: CreateProductDto = {
        name: this.formulario.controls['nome'].value,
        description: this.formulario.controls['descricao'].value,
        price: Number(this.formulario.controls['preco'].value),
        stock: Number(this.formulario.controls['estoque'].value)
      };
      this.productDtoService.criarProduto(ProductDto).subscribe({
        next: (response) => {
          this.openSnackBarSucesso();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  atualizar() {
    if (this.formulario.valid) {
      const id = this.formulario.controls['id'].value;
      const ProductDto: UpdateProductDto = {
        name: this.formulario.controls['nome'].value,
        description: this.formulario.controls['descricao'].value,
        price: Number(this.formulario.controls['preco'].value),
        stock: Number(this.formulario.controls['estoque'].value),
      };
      this.productDtoService.atualizarProduto(id, ProductDto).subscribe({
        next: (response) => {
          this.openSnackBarSucesso();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  fechar(){
    this.dialogRef.close()
  }

  openSnackBarSucesso() {
    this._snackBar.open('Operação realizada com sucesso!', 'Fechar', {
    });
  }
}