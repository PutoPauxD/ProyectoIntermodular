import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactarService {
  private url:string = "http://localhost/dist/api/";
  constructor(private http: HttpClient) { }
  insertarFormulario(form:any): Observable<any>{
    return this.http.post(this.url+"?contactar=1",form);
  }
  getFormulario():Observable<any>{
    return this.http.get(this.url+"?formulario=1");
  }
  borrarContact(id: any):Observable<any>{
    return this.http.delete(this.url+"?borrarContact="+id);
  }
}
