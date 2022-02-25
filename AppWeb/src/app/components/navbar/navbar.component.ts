import { DOCUMENT } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { BlogComponent } from 'src/app/funcionalities/blog/blog.component';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  tru:boolean;
  user: User;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  constructor(private userService:UsuariosService,private router:Router,private el: ElementRef) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(6)])
    })

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }


  get emailField(): any {
    return this.loginForm.get('email');
  }

  get emailRegisterField(): any {
    return this.registerForm.get('email');
  }

  get usernameField(): any {
    return this.registerForm.get('username');
  }

  get passwordField(): any {
    return this.loginForm.get('password');
  }

  get passwordRegisterField(): any {
    return this.registerForm.get('password');
  }

  ngOnInit(){
    let u = JSON.parse(sessionStorage.getItem('user'));
      if(u){
        this.user = u;
        this.userService.setUser(u);
      }
  }

  loginFormSubmit(): void {
    this.userService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe((res: any) => {
      let u = JSON.parse(sessionStorage.getItem('user'));
      if(u){
        this.user = u;
        this.userService.setUser(u);
      }else{
        sessionStorage.setItem('user',JSON.stringify(res[0]));
        this.user = res[0];
        this.userService.setUser(this.user);
        document.getElementById("loguear").setAttribute('data-bs-dismiss',"modal");
        document.getElementById("loguear").click();
        this.loginForm.reset();
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        });
      };
      },
      error => {alert("Error al acceder, pruebe de nuevo.")}
      );
  }
  closeLogin(): void {
    this.loginForm.reset();
    this.registerForm.reset();
  }

  onSubmit() {
    this.userService.insertarUser(this.registerForm.value).subscribe(()=>{
      document.getElementById("re").setAttribute('data-bs-dismiss',"modal");
      document.getElementById("re").click();
      this.registerForm.reset();
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        });
    });


  }

  logout(){
    this.user=undefined;
    sessionStorage.removeItem('user');
    sessionStorage.clear();
    this.userService.setUser(this.user);
    let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
      });
  }

}
