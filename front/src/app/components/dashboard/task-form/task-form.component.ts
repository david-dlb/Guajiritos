import { Component, effect, inject, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule} from '@angular/material/radio';
import { TaskCreate, TaskService } from '../../../shared/services/task/task.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { SnackBarService } from '../../../shared/snack-bar.service';
import { User, UserService } from '../../../shared/services/user/user.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-task-form',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterLink,
    MatButtonModule, ReactiveFormsModule, MatSelectModule, MatRadioModule, MatSnackBarModule, MatCardModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export default class TaskFormComponent {
  taskService = inject(TaskService)
  userService = inject(UserService)
  authService = inject(AuthService)
  route = inject(ActivatedRoute)
  isAdmin = true
  private _form = inject(FormBuilder)
  form = this._form.group({
    name: ["", Validators.required],
    description: ["", Validators.required],
    user: ["", Validators.required], // Campo obligatorio, pero se auto-completará si !isAdmin
    state: ["0", Validators.required],
  });
   
  
  async initializeForm() {
   
    // Si el usuario NO es admin, obtenemos su ID y lo asignamos al campo 'user'
    if (!this.isAdmin) {
      try {
        const id = await this.authService.getCurrentUserId()
        this.form.patchValue({ user: id }); // Asigna el ID al campo 'user' 
      } catch (error) {
        this.snackBar.openSnackBar("Usuario no valido")   
      }
      
    }
  }
  users: User[] = []
  private snackBar = inject(SnackBarService);
  
  id: string | null = null 

  async ngOnInit() {
    this.id = "1"
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
    });
    this.get()
    this.isAdmin = await this.authService.isAdmin() 
    this.initializeForm()
    if (this.isAdmin) {
      this.getUsers()
      if (!this.existUser()) {
        console.log(1)
        this.form.patchValue({ user: "" }); // Asigna el ID al campo 'user'
      }
    }
  }

  submit() {
    const { name, description, user, state } = this.form.value 
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.id) {
      const data = {
        id: this.id,
        name: name || "",
        description: description || "",
        state: state || "",
        userId: user || ""
      } 
      try {
        this.taskService.edit(data) 
        this.snackBar.openSnackBar("Tarea editada") 
      } catch (error) {
        this.snackBar.openSnackBar("Error al enviar")   
      }
    } else {
      const data = {
        name: name || "",
        description: description || "",
        state: state || "",
        userId: user || ""
      }
      console.log(data)
      try {
        this.taskService.create(data)     
        this.form.setValue({
          name: "",
          description: "",
          user: "",
          state: "0"
        })
        this.snackBar.openSnackBar("Tarea creada")   
      } catch (error) {
        this.snackBar.openSnackBar("Error al enviar")   
        
      }
    }
  }

  async get() {
    if (this.id) {
      const data = await this.taskService.getById(this.id)
      if (data[0]) {
        try {
          this.form.patchValue(data[0])
        } catch (error) {
          this.snackBar.openSnackBar("Error al obtener la tarea")   
        }
      }
    }
  }

  async getUsers() {
    try {
      this.users = await this.userService.getByClient()
    } catch (error) {
      this.snackBar.openSnackBar("Error al cargar usuarios")   
    }
  }
  existUser() {
    let mk: boolean = false
    this.users.forEach((e) => {
      if (this.form.value.user && e.id == this.form.value.user) {
        mk = true
      }
    })
    return mk
  }
 
}
