import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenComponent } from './imagen.component';
import { GaleriaComponent } from 'src/app/funcionalities/galeria/galeria.component';



@NgModule({
  declarations: [
    ImagenComponent
  ],
  exports: [
    ImagenComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ImagenModule { }
