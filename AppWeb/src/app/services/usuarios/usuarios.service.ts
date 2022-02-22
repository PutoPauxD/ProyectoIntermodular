import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/clases/user';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url:string = "http://localhost/api/";
  public $user: Subject<User> = new Subject<User>();
  public user: User;


  constructor(private http: HttpClient) { }

  insertarUser(user:User): Observable<any>{
    return this.http.post(this.url+"?insertar=1",user).pipe(
      catchError((resp: HttpErrorResponse)=>
        throwError(`Error al acceder, ${resp.message}`))
    );
  }
  login(email:any, contrasenia:any):Observable<any>{
    return this.http.get(this.url+"?login="+email+"&contrasenia="+contrasenia).pipe(
      catchError((resp: HttpErrorResponse)=>
        throwError(`Error al acceder, ${resp.message}`))
    );
  }

  getUsuarios():Observable<any>{
    return this.http.get(this.url);
  }
  setUser(user: User): void {
    this.$user.next(user);
    this.user = user;
  }

  getUser(): Observable<User> {
    return this.$user;
  }

  checkUserExist(){
    return this.user;
  }
}
