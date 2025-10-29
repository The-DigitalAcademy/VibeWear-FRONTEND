import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DescriptionPageComponent } from './components/description-page/description-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductservService } from './services/productserv.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from './services/cart.service';
import { CheckOutPopUpComponent } from './components/check-out-pop-up/check-out-pop-up.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CartComponent,
    NavbarComponent,
    ProductPageComponent,
    DescriptionPageComponent,
    CheckOutPopUpComponent,
  ], //i imported CartComponet ,Description and  NavbarComponent, because i made it Standalone so i can be to export
  providers: [ProductservService, CartService], // imported this service here to be used across the app
  bootstrap: [AppComponent],
})
export class AppModule {}
