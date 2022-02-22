import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from 'src/app/funcionalities/contact/contact.component';
import { PostContactoComponent } from './post-contacto.component';



@NgModule({
  declarations: [PostContactoComponent],
  exports: [
    PostContactoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PostContactoModule { }
