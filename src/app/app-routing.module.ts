import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescriptionPageComponent } from './components/description-page/description-page.component';
import { HomeComponent } from './components/home/home.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'products/:id', component: DescriptionPageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
