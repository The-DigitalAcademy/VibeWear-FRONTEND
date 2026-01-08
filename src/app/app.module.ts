import { NgModule, isDevMode } from '@angular/core';
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
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AUTH_FEATURE_KEY, authReducer } from './store/auth/auth.reducer';
import { PRODUCT_FEATURE_KEY, productReducer } from './store/products/product.reducer';
import { CART_FEATURE_KEY, cartReducer } from './store/cart/cart.reducer';
import { ProductsEffects } from './store/products/product.effects';
import { LoginComponent } from './components/login/login.component';
import { AuthEffects } from './store/auth/auth.effects';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, HomeComponent, LoginComponent, RegisterComponent],
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
    StoreModule.forRoot({}),
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer),
    StoreModule.forFeature(PRODUCT_FEATURE_KEY, productReducer),
    StoreModule.forFeature(CART_FEATURE_KEY, cartReducer),
    EffectsModule.forRoot([ProductsEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ReactiveFormsModule,
  ],
  providers: [ProductservService, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}