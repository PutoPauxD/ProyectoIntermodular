import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { PostComponent } from 'src/app/components/post/post.component';
import { PostModule } from 'src/app/components/post/post.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BlogComponent,
  ],
  imports: [
    CommonModule,
    PostModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BlogModule { }
