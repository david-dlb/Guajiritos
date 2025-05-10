import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '../../shared/services/auth/auth.service';
import { SnackBarService } from '../../shared/snack-bar.service';

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
  private authService = inject(AuthService)
  form = this._form.group({
    name: ["", Validators.required],
    password: ["", Validators.required]
  })
  private snackBar = inject(SnackBarService);
  email: string = '';
  password: string = '';
  hide: boolean = true;

  onLogin() {
    // Aquí puedes agregar lógica de autenticación
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
   
  async submit() {
    console.log(this.form.getRawValue())
    const { name, password } = this.form.value 
    const data = {
      name: name || "",
      email: "d@d.d",
      password: password || ""
    }
    const response = await this.authService.login(data)
    console.log(response)
    if (response.accessToken) {
      const jwtToken = response.accessToken
      // Para guardar el token
      localStorage.setItem('token', jwtToken);
      
      this._router.navigateByUrl("/dashboard/task")
    } else {
      this.snackBar.openSnackBar("Error al enviar")
      console.log('Error:', data);
    } 
  }

  invalid() {
    return this.form.invalid
  }
}
