import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  todaslasimagenes: Imagen[] = [];
  files: File[] = [];
  imgDetails:any[]=[];
  array:User[]=[];
  usersconimagenes:User[]=[];
  ob:Imagen={
    id:0,
    url:"",
    usuario_id:0
  };
  selected:User=undefined;
  constructor(
    private imagenesService: ImagenesService,
    private userService:UsuariosService,
    private title: Title
  ) {
    this.title.setTitle("Galería");
  }


  ngOnInit(): void {
    if(this.userService.checkUserExist()) {
      this.user = this.userService.checkUserExist();
    } else {
      this.userService.getUser().subscribe(user => {this.user = user});
    }
    this.imagenesService.getImagenes().subscribe(res=>{this.todaslasimagenes = res
      this.userService.getUsuarios().subscribe(req => {
        this.array = req;
        for(let i=0;i<this.array.length;i++){
          for(let o=0;o<this.todaslasimagenes.length;o++){
            if(this.array[i].id === this.todaslasimagenes[o].usuario_id){
                this.usersconimagenes.push(this.array[i]);
            }
          }
        };
        let reult = this.usersconimagenes.filter((item,index)=>{
          return this.usersconimagenes.indexOf(item) === index;
        });

        this.usersconimagenes = reult;
      });
      this.imagenes=this.todaslasimagenes;
    });

  }


  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.imgDetails = [];
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
    const imgAsubir = this.imgDetails[0].content;
    this.ob.usuario_id = this.user.id;
    this.ob.url = imgAsubir;

    this.imagenesService.insertarImagen(this.ob).subscribe(res=>{
      this.imagenesService.getImagenes().subscribe(res=>{this.todaslasimagenes = res
        this.imagenes=[];
        if(!this.selected){
          this.imagenes = this.todaslasimagenes;
        }else{
          for(let i=0;i<this.todaslasimagenes.length;i++){
            if(this.todaslasimagenes[i].usuario_id === this.selected.id){
                this.imagenes.push(this.todaslasimagenes[i]);
            }
          }
        }
        this.usersconimagenes = [];
        if(this.array.length ===0){
          this.usersconimagenes.push(this.user);
        }else{
          for(let i=0;i<this.array.length;i++){
            for(let o=0;o<this.todaslasimagenes.length;o++){
              if(this.array[i].id === this.todaslasimagenes[o].usuario_id){
                  this.usersconimagenes.push(this.array[i]);
              }
            }
          };
          this.usersconimagenes = this.usersconimagenes.filter((item,index)=>{
            return this.usersconimagenes.indexOf(item) === index;
          });
        }

      });
      this.imgDetails = [];


    });
    this.files = [];
  }
  onDeleteImagen(iControl:number,id:number):void{
    this.imagenesService.borrarImagen(id).subscribe(res=>{
        this.imagenes.splice(iControl, 1);
        this.usersconimagenes=[];
        if(this.imagenes.length === 0){
          this.selected = undefined;
          this.imagenesService.getImagenes().subscribe(res=>{this.imagenes = res

            for(let i=0;i<this.array.length;i++){
              for(let o=0;o<this.imagenes.length;o++){
                if(this.array[i].id === this.imagenes[o].usuario_id){
                    this.usersconimagenes.push(this.array[i]);
                }
              }
            };
            this.usersconimagenes = this.usersconimagenes.filter((item,index)=>{
              return this.usersconimagenes.indexOf(item) === index;
            });
          });
        }else{
          this.imagenesService.getImagenes().subscribe(res=>{this.todaslasimagenes = res
            this.usersconimagenes=[];
            for(let i=0;i<this.array.length;i++){
              for(let o=0;o<this.todaslasimagenes.length;o++){
                if(this.array[i].id === this.todaslasimagenes[o].usuario_id){
                    this.usersconimagenes.push(this.array[i]);
                }
              }
            };
            this.usersconimagenes = this.usersconimagenes.filter((item,index)=>{
              return this.usersconimagenes.indexOf(item) === index;
            });
          });
        }



    });
  }

  cambiar(){
    this.imagenesService.getImagenes().subscribe(res=>{this.todaslasimagenes = res
      this.imagenes=[];
      if(!this.selected){
        this.imagenes = this.todaslasimagenes;
      }else{
        for(let i=0;i<this.todaslasimagenes.length;i++){
          if(this.todaslasimagenes[i].usuario_id === this.selected.id){
              this.imagenes.push(this.todaslasimagenes[i]);
          }
        }
      }

    });
  }


}
