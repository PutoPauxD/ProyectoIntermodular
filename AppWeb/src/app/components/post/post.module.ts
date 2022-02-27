import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ValoracionesComponent } from '../valoraciones/valoraciones.component';



@NgModule({
  declarations: [
    PostComponent,
    ValoracionesComponent
  ],
  exports: [
    PostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class PostModule { }
