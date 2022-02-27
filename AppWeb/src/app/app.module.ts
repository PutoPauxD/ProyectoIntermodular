import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostComponent } from './components/post/post.component';
import { PostModule } from './components/post/post.module';
import { BlogModule } from './funcionalities/blog/blog.module';
import { FooterComponent } from './components/footer/footer.component';
import { GaleriaModule } from './funcionalities/galeria/galeria.module';
import { ContactModule } from './funcionalities/contact/contact.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PostContactoComponent } from './components/post-contacto/post-contacto.component';
import { PostContactoModule } from './components/post-contacto/post-contacto.module';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { ValoracionesComponent } from './components/valoraciones/valoraciones.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ComentariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BlogModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    ContactModule,
    GaleriaModule,
    HttpClientModule,
    PostContactoModule
  ],
  providers: [Title,{provide: LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
