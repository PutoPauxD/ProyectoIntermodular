import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Imagen } from 'src/app/clases/imagen';
import { User } from 'src/app/clases/user';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})
export class ImagenComponent implements OnInit {
  @Input('imagen') data!: Imagen;
  imagePath:SafeResourceUrl;
  usuario:User[]=[];
  nombre:String;
  user: User;
  @Output() deleted: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _sanitizer: DomSanitizer,private userService:UsuariosService) {if(this.userService.checkUserExist()) {
    this.user = this.userService.checkUserExist();
  } else {
    this.userService.getUser().subscribe(user => {this.user = user});
  }}

  ngOnInit() {
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+ this.data.url);
    this.userService.getUsuarios().subscribe(req => {
      this.usuario = req
      for(let i=0;i<this.usuario.length;i++){
        if(this.usuario[i].id === this.data.usuario_id){
          this.nombre=this.usuario[i].name;
        }
      }
    });
  }
  borrar(){
    this.deleted.emit(this.data.id);
  }


}

