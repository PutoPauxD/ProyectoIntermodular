import { Component, EventEmitter, Input, NgZone, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  array:any[]=[];
  $abrir:boolean;
  id:number;
  user: User;
  @Input('post') dataarray!: Post[];
  comentarioForm!: FormGroup;
  auxRating: number=0;
  rating: number=0;

  @Output() ratingChanged = new EventEmitter<number>();

  constructor(private zone:NgZone,private postsService: PostsService, private userService:UsuariosService) {

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
  restoreRating() {
    this.auxRating = this.rating;
  }

  setRating() {
    this.rating=this.auxRating;
    }


}
