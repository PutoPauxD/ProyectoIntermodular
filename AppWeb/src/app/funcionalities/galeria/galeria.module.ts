import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaleriaComponent } from './galeria.component';
import { ImagenComponent } from 'src/app/components/imagen/imagen.component';
import { ImagenModule } from 'src/app/components/imagen/imagen.module';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    GaleriaComponent
  ],
  imports: [
    CommonModule,
    ImagenModule,
    NgxDropzoneModule
  ]
})
export class GaleriaModule { }
