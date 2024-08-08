import { Component, Inject, OnInit } from '@angular/core';
import { ProductDtoService } from '../../services/productDto.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-excluir',
  templateUrl: './modal-excluir.component.html',
  styleUrl: './modal-excluir.component.css'
})
export class ModalExcluirComponent implements OnInit {
  id!: number;

  constructor(
    private productDtoService: ProductDtoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalExcluirComponent>
  ) {
    this.id = data.id;
  }

  ngOnInit(): void {
  }

  fechar(){
    this.dialogRef.close()
  }
  excluir() {
    this.productDtoService.excluirProduto(this.id).subscribe({
      next: (response) => {
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
