import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { DetalheComponent } from './pages/detalhe/detalhe.component';

const routes: Routes = [
  {
    path:"",
    component: LoginComponent
},
{
    path:"produto",
    component: ProdutoComponent
},
{
  path: 'detalhe/:id',
  component: DetalheComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
