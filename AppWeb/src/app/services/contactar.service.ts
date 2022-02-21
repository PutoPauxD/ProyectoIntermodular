import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactarService {
  private url:string = "https://www.intermodal.daw/api/";
  constructor(private http: HttpClient) { }
  insertarFormulario(form:any): Observable<any>{
    return this.http.post(this.url+"?contactar=1",form);
  }
}
