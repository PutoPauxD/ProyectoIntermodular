import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/clases/user';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-post-contacto',
  templateUrl: './post-contacto.component.html',
  styleUrls: ['./post-contacto.component.css']
})
export class PostContactoComponent implements OnInit {
  @Input('postContacto') data!: any;
  @Output() deleted: EventEmitter<any> = new EventEmitter<any>();
  constructor(private userService:UsuariosService) { }

  ngOnInit(): void {

  }

  borrar(){
    this.deleted.emit(this.data.id);
  }
}
