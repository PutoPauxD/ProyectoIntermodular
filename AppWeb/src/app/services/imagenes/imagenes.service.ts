import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imagen } from 'src/app/clases/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  url:string = "http://localhost/dist/api/";
  constructor(private http: HttpClient) { }

  insertarImagen(imagen:Imagen): Observable<any>{
    return this.http.post(this.url+"?imagen=1",imagen);
  }

  getImagenes():Observable<any>{
    return this.http.get(this.url+"?imagenes=1");
  }

  borrarImagen(id: any):Observable<any>{
    return this.http.delete(this.url+"?borrarImagen="+id);
  }
}
