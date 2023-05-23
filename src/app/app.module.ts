import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaCrudComponent } from './components/categoria-crud/categoria-crud.component';
import { ArticuloCrudComponent } from './components/articulo-crud/articulo-crud.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    CategoriaCrudComponent,
    ArticuloCrudComponent,
    CategoriaComponent,
    ArticuloComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
