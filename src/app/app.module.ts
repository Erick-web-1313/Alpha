import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalExcluirComponent } from './components/modal-excluir/modal-excluir.component';
import { TokenInterceptor } from './auth/TokenInterceptor';
import { MatInputModule } from '@angular/material/input';
import { FormProdutoComponent } from './components/form-produto/form-produto.component';
import { DetalheComponent } from './pages/detalhe/detalhe.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProdutoComponent,
    ModalExcluirComponent,
    FormProdutoComponent,
    DetalheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule 
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
