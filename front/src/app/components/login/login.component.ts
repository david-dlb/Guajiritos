import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule, ReactiveFormsModule, MatSnackBarModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  private _form = inject(FormBuilder)
  private _router = inject(Router)
  form = this._form.group({
    name: ["", Validators.required],
    password: ["", Validators.required]
  })
  private _snackBar = inject(MatSnackBar);
  email: string = '';
  password: string = '';
  hide: boolean = true;

  onLogin() {
    // Aquí puedes agregar lógica de autenticación
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  } 
  constructor() {

  }
  submit() {
    console.log(this.form.getRawValue())
    const { name, password } = this.form.value 

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: "f@g.c",
        password: password
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.accessToken) {
        const jwtToken = data.accessToken
        // Para guardar el token
        localStorage.setItem('token', jwtToken);
        
        this._router.navigateByUrl("/dashboard/taks")
      } else {
        console.log('Error:', data);
      }
    })
    .catch(error => console.error('Error en la petición:', error));
  }

  invalid() {
    return this.form.invalid
  }
}
