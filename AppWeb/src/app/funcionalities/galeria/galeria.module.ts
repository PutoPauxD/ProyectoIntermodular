import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaleriaComponent } from './galeria.component';
import { ImagenComponent } from 'src/app/components/imagen/imagen.component';
import { ImagenModule } from 'src/app/components/imagen/imagen.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostModule } from 'src/app/components/post/post.module';


@NgModule({
  declarations: [
    GaleriaComponent
  ],
  imports: [
    CommonModule,
    ImagenModule,
    NgxDropzoneModule,
    PostModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GaleriaModule { }
