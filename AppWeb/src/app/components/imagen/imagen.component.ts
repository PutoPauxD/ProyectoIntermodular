import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Imagen } from 'src/app/clases/imagen';
import { User } from 'src/app/clases/user';
import { ImagenesService } from 'src/app/services/imagenes/imagenes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})
export class ImagenComponent implements OnInit {

  @Input('imagen') data!: Imagen;
  imagePath:SafeResourceUrl;
  constructor(private _sanitizer: DomSanitizer,private userService:UsuariosService) {}

  ngOnInit(): void {
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+ this.data.url);
  }

}
