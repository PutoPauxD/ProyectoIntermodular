import { Component, EventEmitter, Input, NgZone, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { observable, Observable, of, shareReplay, timer } from 'rxjs';
import { Post } from 'src/app/clases/post';
import { User } from 'src/app/clases/user';
import { PostsService } from 'src/app/services/posts.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  a:boolean;
  array:any[]=[];
  valoraciones:any[]=[];
  $abrir:boolean;
  id:number;
  user: User;
  @Input('post') dataarray!: Post[];
  comentarioForm!: FormGroup;

  constructor(private router:Router,private postsService: PostsService, private userService:UsuariosService) {

  }

  ngOnInit(): void {
    this.comentarioForm = new FormGroup({
      message: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
    if(this.userService.checkUserExist()) {
      this.user = this.userService.checkUserExist();
    } else {
      this.userService.getUser().subscribe(user => {this.user = user});
    }
    this.postsService.getComentarios().subscribe((res:any)=>{this.array=res},error=>{console.log(error)});
    this.postsService.getValoraciones().subscribe((res:any)=>{this.valoraciones=res},error=>{console.log(error)});
  }

  get contentField(): any {
    return this.comentarioForm.get('message');
  }

  closeComentarioForm(): void {
    this.comentarioForm.reset();
  }
  comentarioFormSubmit() {
    this.postsService.putComentario({mensaje:this.comentarioForm.get('message').value,post_id:this.id,usuario_id:this.user.id}).subscribe(res=>this.postsService.getComentarios().subscribe((res:any)=>{this.array=res},error=>{console.log(error)}));
    this.comentarioForm.reset();
  }

  abrirComentario(post:Post){
        this.id = post.id;
        console.log(this.array);
        if(this.array.length===0){
          this.$abrir=true;
        }else{
          this.$abrir=true;
          for(let i=0;i<this.array.length;i++){
            if(this.array[i].post_id === post.id && this.array[i].usuario_id === this.user.id){

                this.$abrir = false;

            }
          }
        }
  }


  changeRating(rating: number,data:Post) {
    this.a=false;
      if(this.valoraciones.length===0){
        this.postsService.setValoracion({contenido:rating,post_id:data.id,usuario_id:this.user.id}).subscribe(
          ()=>data.valoracion=rating
          );
      }else{

        for(let i=0;i<this.valoraciones.length;i++){
          if(this.valoraciones[i].post_id === data.id && this.valoraciones[i].usuario_id === this.user.id ){
            this.postsService.putValoracion(this.valoraciones[i].id,{contenido:rating}).subscribe();
            data.valoracion=rating;
            this.a=true;
          }
        }
        if(!this.a){
          this.postsService.setValoracion({contenido:rating,post_id:data.id,usuario_id:this.user.id}).subscribe(
            ()=>data.valoracion=rating
            );
        }
      }
            let currentUrl = this.router.url;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
            });
    }
}
