import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, shareReplay } from 'rxjs';
import { Post } from 'src/app/clases/post';
import { User } from 'src/app/clases/user';
import { PostComponent } from 'src/app/components/post/post.component';
import { PostsService } from 'src/app/services/posts.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  user: User;
  postForm!: FormGroup;
  todosPosts: Post[] = [];
  postsNoVer: Post[] = [];
  postsVer: Post[]=[];
  usuario: User[] = [];
  selected: Post;

  eliminadoSelected: Post;

  constructor(private postsService: PostsService,
    private userService:UsuariosService,private route:Router) {
    }

    ngOnInit(): void {
      if(this.userService.checkUserExist()) {
        this.user = this.userService.checkUserExist();
      } else {
        this.userService.getUser().subscribe(user => {this.user = user});
      }
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
    this.postsService.getPosts().subscribe(res=>{this.postsVer = res;
      this.userService.getUsuarios().subscribe(res=>{
        this.usuario = res;
        for(let i=0;i<this.usuario.length;i++){
          for(let o=0;o<this.postsVer.length;o++){
            if(this.usuario[i].id === this.postsVer[o].usuario_id){
              this.postsVer[o].nombre = this.usuario[i].name;
            }
          }
        }

      });
    });
    this.postsService.getPostsNoVer().subscribe(res2 => {this.postsNoVer = res2});

    }

  get titleField(): any {
    return this.postForm.get('title');
  }

  get contentField(): any {
    return this.postForm.get('message');
  }

  closePostForm(): void {
    this.postForm.reset();
  }

  cargarPosts() {
    if(this.user.tipe == 0) {
      this.postsService.getTodosPost().subscribe(res => (this.todosPosts = res));
    } else if (this.user.tipe == 1) {
      this.postsService.getTusPosts(this.user.id).subscribe(res => (this.todosPosts = res));
      this.todosPosts=[];
    }
  }

  postFormSubmit(): void {
    let p: Post = {
      titulo: this.postForm.get('title').value,
      mensaje: this.postForm.get('message').value,
      publicada: 0,
      usuario_id: this.user.id
    }
    this.postsService.putPosts(p).subscribe();
    this.postsService.getPostsNoVer().subscribe(res2 => (this.postsNoVer = res2));
    this.postForm.reset();
  }

  publicar(){
    this.postsService.setPublicada(this.selected.id).subscribe();
    this.postsVer.push(this.selected);
    for(let i=0;i<this.usuario.length;i++){
      for(let o=0;o<this.postsVer.length;o++){
        if(this.usuario[i].id === this.postsVer[o].usuario_id){
          this.postsVer[o].nombre = this.usuario[i].name;
        }
      }
    }
  }

  borrar(iControl:any, id:any){
    this.postsService.borrarPosts(id).subscribe(res => {
      if(this.user.tipe == 0) {
        this.postsVer.splice(iControl, 1);
        this.todosPosts.splice(iControl, 1);
      } else {
        this.todosPosts.splice(iControl, 1);
        for(let i=0;i<this.postsVer.length;i++){
          if(id===this.postsVer[i].id){
            iControl = i;
            this.postsVer.splice(iControl, 1);
          }
        }

      }
    });
  }

  resetear(){
    this.postsService.getPostsNoVer().subscribe(
      res2 => {this.postsNoVer = res2},
      error => console.log(error),
      );
  }
}
