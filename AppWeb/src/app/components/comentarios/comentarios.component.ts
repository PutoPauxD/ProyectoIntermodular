import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { PostsService } from 'src/app/services/posts.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  id:number;
  usuario:User[];
  array:any[];
  comentariosver:any[]=[];
  constructor(private router: Router,private route:ActivatedRoute,private postService:PostsService,private userService:UsuariosService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.data['id'];
    this.postService.getComentarios().subscribe((res:any)=>{this.array=res;
    for(let i=0;i<this.array.length;i++){
      if(this.array[i].post_id === this.id){
        this.comentariosver.push(this.array[i]);
      }

    }
    this.userService.getUsuarios().subscribe(req => {
      this.usuario = req;
      for(let i=0;i<this.usuario.length;i++){
        for(let o=0;o<this.comentariosver.length;o++){
          if(this.usuario[i].id === this.comentariosver[o].usuario_id){
            this.comentariosver[o].name = this.usuario[i].name;
          }
        }

      }
    });
    });

  }
  borrar(iControl:number,id:number){
    this.postService.borrarComentario(id).subscribe(res=>this.comentariosver.splice(iControl, 1));

  }

}
