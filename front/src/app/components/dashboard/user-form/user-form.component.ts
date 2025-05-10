import { Component, effect, inject, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule} from '@angular/material/radio';
import { UserService } from '../../../shared/services/user/user.service';
import { SnackBarService } from '../../../shared/snack-bar.service';


@Component({
  selector: 'app-user-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterLink,
    MatButtonModule, ReactiveFormsModule, MatSelectModule, MatRadioModule, MatSnackBarModule, MatCardModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  private _form = inject(FormBuilder)
  userService = inject(UserService)
  route = inject(ActivatedRoute)
  form = this._form.group({
    name: ["", Validators.required],
    password: ["", Validators.required],
    email: ["", Validators.required],
    role: ["admin", Validators.required],
  })

  hide: boolean = true; 
  private snackBar = inject(SnackBarService);
  
  id: string | null = null 

  ngOnInit() {
    this.id = "1"
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
    });
    this.get()
  }

  async submit() {
    const { name, password, email, role } = this.form.value 
    
    if (this.id) {
      
      if (password) {
        const data = {
          id: this.id,
          name: name || "",
          password: password,
          email: email || "",
          role: role || "", 
        } 
      const s = await this.userService.edit(data)
      console.log(s)
      } else {
        let data = {
          id: this.id,
          name: name || "",
          email: email || "",
          role: role || "", 
        } 
        const s = await this.userService.edit(data)
      }
    } else {
      const data = {
        name: name || "",
        password: password || "",
        email: email || "",
        role: role || "", 
      } 
      console.log(data)
      try {
        this.userService.create(data)    
        this.form.reset();
        this.snackBar.openSnackBar("Usuario enviada")   
      } catch (error) {
        this.snackBar.openSnackBar("Error al enviar")   
      }
    }
  }

  async get() {
    if (this.id) {
      try {  
        const data = await this.userService.getById(this.id)
        if (data[0]) {
          this.form.patchValue(data[0])
        }
      } catch (error) {
        this.snackBar.openSnackBar("Error al obtener usuario")   
      }
    }
  }
}
