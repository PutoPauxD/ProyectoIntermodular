import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Post } from 'src/app/clases/post';
import { User } from 'src/app/clases/user';
import { ContactarService } from 'src/app/services/contactar.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  user:User;
  formulario:Post[];


  constructor(private title: Title,private serviceContactar:ContactarService, private userService:UsuariosService,private router:Router ) {
    this.title.setTitle("Contacto");
  }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mensaje: new FormControl('', [Validators.required, Validators.minLength(10)]),
    })

    if(this.userService.checkUserExist()) {
      this.user = this.userService.checkUserExist();
      this.contactForm.setValue({name:this.user.name,
        email:this.user.email,mensaje:""});
    } else {
      this.userService.getUser().subscribe(user => {this.user = user});
    }
    this.serviceContactar.getFormulario().subscribe(res=>this.formulario=res);
   }

  get nameField(): any {
    return this.contactForm.get('name');
  }

  get emailField(): any {
    return this.contactForm.get('email');
  }

  get messageField(): any {
    return this.contactForm.get('mensaje');
  }

  onSubmit(){
    this.serviceContactar.insertarFormulario(this.contactForm.value).subscribe();
    this.contactForm.reset();
    let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        });
  }

  onDeleteContact(iControl:number,id:number):void{
    this.serviceContactar.borrarContact(id).subscribe(res=>{ this.formulario.splice(iControl, 1);});
  }
}
