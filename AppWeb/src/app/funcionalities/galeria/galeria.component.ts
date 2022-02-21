import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Imagen } from 'src/app/clases/imagen';
import { User } from 'src/app/clases/user';
import { ImagenesService } from 'src/app/services/imagenes/imagenes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {
  user:User;
  imagenes: Imagen[] = [];
  files: File[] = [];
  imgDetails:any[]=[];
  array:User[];
  ob:Imagen={
  url:"",
  usuario_id:0

  };
  constructor(
    private imagenesService: ImagenesService,
    private userService:UsuariosService,
    private router: Router
  ) {

  }


  ngOnInit(): void {
    this.imagenesService.getImagenes().subscribe(res=>this.imagenes=res);
    if(this.userService.checkUserExist()) {
      this.user = this.userService.checkUserExist();
    } else {
      this.userService.getUser().subscribe(user => {this.user = user});
    }
  }


  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    if (this.files && this.files[0]) {
      for(let i = 0; i < this.files.length; i++) {
        this.convertToBase64(this.files[0])
        .then((result: string) => {
            const base64String = result.replace('data:', '')
              .replace(/^.+,/, '');
              this.imgDetails.push({ name:this.files[i].name, content:base64String });
          });
      }
    }
    console.log(this.imgDetails);
  }

  convertToBase64 = (file:File):Promise<string> => {
    return new Promise<string> ((resolve,reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result!.toString());
      reader.onerror = error => reject(error);
    })
  }
  subirImagen() {
    console.log(this.user.id)
    const imgAsubir = this.imgDetails[0].content;
    this.ob.usuario_id = Number(this.user.id);
    this.ob.url = imgAsubir;
    this.imagenes.push(this.ob);
    this.imagenesService.insertarImagen(this.ob).subscribe();
  }




}
