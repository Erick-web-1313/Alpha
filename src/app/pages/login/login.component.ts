import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDtoService } from '../../services/loginDto.service';
import { LoginDTO } from '../../models/LoginDTO.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private loginDtoService: LoginDtoService,
    private _snackBar: MatSnackBar
  ) {
    this.formulario = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  autenticar() {
    if (this.formulario.invalid) {
      console.log('Formulário inválido');
      this.openSnack('Preencha todos os campos obrigatórios');
      this.formulario.markAllAsTouched();
      return;
    }
    const login: LoginDTO = {
      taxNumber: this.formulario.controls['usuario'].value,
      password: this.formulario.controls['senha'].value
    };
    this.loginDtoService.login(login).subscribe({
      next: (response) => {
        if (response.success) {
          localStorage.setItem('token', JSON.stringify(response.data.token));
          this.openSnack(response.message);
          setTimeout(() => {
            window.location.href = '/produto';
          }, 2000);
        } else {
          this.openSnack(response.message);
        }
      },
      error: (error) => {
        if (error.error && error.error.message) {
          const errorMessages = Array.isArray(error.error.message) ? error.error.message : [error.error.message];
          const formattedMessages = errorMessages.join(', ');
          this.openSnack(formattedMessages);
        } else {
          this.openSnack('Ocorreu um erro ao tentar realizar o login');
        }
      }
    });
  }
  

  openSnackErro(mensagem: string) {
    this._snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
    });
  }
  
  openSnack(mensagem: string) {
    this._snackBar.open(mensagem + '!', 'Fechar', {
    });
  }
}
