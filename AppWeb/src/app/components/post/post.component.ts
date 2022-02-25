import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  usuario:User[];
  nombre:string;
  user: User;
  @Input('post') data!: Post;
  comentarioForm!: FormGroup;


  constructor(private postsService: PostsService, private userService:UsuariosService) {

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
    this.userService.getUsuarios().subscribe(req => {
      this.usuario = req;
      for(let i=0;i<this.usuario.length;i++){
        if(this.usuario[i].id === this.data.usuario_id){
          this.nombre=this.usuario[i].name;
        }
      }
    });
  }

  get contentField(): any {
    return this.comentarioForm.get('message');
  }

  closeComentarioForm(): void {
    this.comentarioForm.reset();
  }
  comentarioFormSubmit() {
    this.postsService.putComentario({mensaje:this.comentarioForm.get('message').value,post_id:Number(localStorage.getItem("id")),usuario_id:this.user.id}).subscribe();
    this.comentarioForm.reset();
  }

  abrirComentario(evento:Post){
    localStorage.setItem("id",""+evento.id);
  }
}
