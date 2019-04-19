import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {CustomMaterialModule} from './material.module';
import {CustomersComponent} from './customers/customers.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {ProductsComponent} from './products/products.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {CookieService} from './cookie.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomersComponent,
    HeaderComponent,
    ProductsComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  entryComponents: [ProductDetailComponent],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
