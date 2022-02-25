import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './funcionalities/home/home.component';
import { BlogComponent } from './funcionalities/blog/blog.component';
import { GaleriaComponent } from './funcionalities/galeria/galeria.component';
import { ContactComponent } from './funcionalities/contact/contact.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { ComentariosResolver } from './resolvers/comentarios.resolver';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo:'home'},
  { path: 'home', component: HomeComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'blog/:id', component: ComentariosComponent,resolve:{id:ComentariosResolver}},
  { path: 'galeria', component: GaleriaComponent },
  { path: 'contact', component: ContactComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
