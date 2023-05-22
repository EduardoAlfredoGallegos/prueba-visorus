import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaCrudComponent } from './components/categoria-crud/categoria-crud.component';
import { ArticuloCrudComponent } from './components/articulo-crud/articulo-crud.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriaCrudComponent,
    ArticuloCrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
