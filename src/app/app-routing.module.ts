import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaCrudComponent } from './components/categoria-crud/categoria-crud.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { ArticuloCrudComponent } from './components/articulo-crud/articulo-crud.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  {
    path: 'categorias', component:CategoriaCrudComponent
  },
  {
    path: 'articulos', component:ArticuloCrudComponent
  },
  {
    path: 'categoria', component: CategoriaComponent
  },
  {
    path: 'categoria/:id', component: CategoriaComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
