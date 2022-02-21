import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactarService } from 'src/app/services/contactar.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;


  constructor(private serviceContactar:ContactarService) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mensaje: new FormControl('', [Validators.required, Validators.minLength(10)]),
    })
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
  }

}
