import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListProductsComponent} from "./list-products/list-products.component";
import {AddProductComponent} from "./add-product/add-product.component";

const routes: Routes = [
  {
    path: '',
    component: ListProductsComponent
  },
  {
    path: 'agregar',
    component: AddProductComponent
  },
  {
    path: 'editar/:id',
    component: AddProductComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
