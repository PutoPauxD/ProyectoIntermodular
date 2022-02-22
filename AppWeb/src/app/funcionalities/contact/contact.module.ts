import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostContactoComponent } from 'src/app/components/post-contacto/post-contacto.component';
import { PostContactoModule } from 'src/app/components/post-contacto/post-contacto.module';



@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PostContactoModule,
    ReactiveFormsModule
  ]
})
export class ContactModule { }
