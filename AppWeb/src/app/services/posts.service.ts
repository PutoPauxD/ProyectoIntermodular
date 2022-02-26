import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Post } from '../clases/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  url:string = "http://localhost/api/";

  constructor(private http: HttpClient) { }

  putPosts(post:Post):Observable<any> {
    return this.http.post(this.url+"?posts=1", post);
  }

  getTodosPost():Observable<any>{
    return this.http.get(this.url+"?postsTodos=1");
  }

  getPosts():Observable<any>{
    return this.http.get(this.url+"?postsVer=1");
  }

  getTusPosts(id: any):Observable<any>{
    return this.http.get(this.url+"?tusPosts="+id);
  }

  getPostsNoVer():Observable<any>{
    return this.http.get(this.url+"?postsNoVer=1").pipe(
      catchError((resp: HttpErrorResponse)=>
        throwError(`Error al obtener posts sin publicar, ${resp.message}`))
    );
  }

  setPublicada(id:any):Observable<any> {
    return this.http.put(this.url+"?publicar="+id, 1);
  }

  borrarPosts(id: any):Observable<any>{
    return this.http.delete(this.url+"?borrar="+id);
  }

  putComentario(comentario:any):Observable<any> {
    return this.http.post(this.url+"?comentario=1", comentario);
  }

  getComentarios():Observable<any>{
    return this.http.get(this.url+"?comentarios=1").pipe(
      catchError((resp: HttpErrorResponse)=>
        throwError(`Error al obtener comentarios, ${resp.message}`))
    );
  }

  borrarComentario(id: any):Observable<any>{
    return this.http.delete(this.url+"?borrarComentario="+id);
  }
}
