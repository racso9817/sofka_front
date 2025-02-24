import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ElementsComponent } from './elements/elements.component';
import { MainComponent } from './main/main.component';
import {RouterModule} from "@angular/router";
import {provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http";
import { AddProductComponent } from './add-product/add-product.component';
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {ReactiveFormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    ElementsComponent,
    MainComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
