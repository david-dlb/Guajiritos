import { Component,ViewChild, effect, inject, Input, input, Signal } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';

import {} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Task, TaskFilter, TaskService } from '../../../shared/services/task/task.service';
import { SnackBarService } from '../../../shared/snack-bar.service';
import { UserService } from '../../../shared/services/user/user.service';
import { MatCardModule } from '@angular/material/card';
 

@Component({
  selector: 'app-task',
  imports: [MatTableModule, MatIcon,FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  displayedColumns: string[] = ['nombre', 'descripcion', 'estado', 'editar'];
  options: { value: string; label: string }[] = [{
    value: "name",
    label: "Nombre:"
  },
  {
    value: "description",
    label: "Descripcion:"
  },
  ];
  @Input() tasks!: Task[];
  taskService = inject(TaskService)
  userService = inject(UserService)
  authService = inject(AuthService)
  dataSource = new MatTableDataSource<Task>();
  isAdmin = false
  totalItems = 0;
  pageSize = 5; // o el valor por default
  currentPage = 0;
  hasElement = true
  private snackBar = inject(SnackBarService);
  

  private _form = inject(FormBuilder)
  form = this._form.group({
    query: ["", Validators.required],
    type: ["", Validators.required],
    state: ["", Validators.required],
  }) 
  private page = 0


  async ngOnInit() { 
    this.isAdmin = await this.authService.isAdmin() 
    await this.search()
    if (this.isAdmin) {
      this.displayedColumns.splice(2, 0, 'usuario');
      this.options.splice(1, 0, { value: 'user', label: 'Usuario' });
    }
  }

  async loadTasks(tasks: Task[]) { 
    tasks.map(async (task) => {
      switch(task.state){
        case "0" :
          task.state = "Pendiente"
          break
        case "1" :
          task.state = "En progreso"
          break
        case "2" :
          task.state = "Completada"
      }
      const user = await this.userService.getById(task.user)
      console.log(user)
      if (user.length > 0) {
        task.user = user[0].name
      }
      else {
        task.user = ""
      }
    })
    this.dataSource.data = tasks;
    this.hasElement = tasks.length > 0 ? true : false
  } 

  async search() {
    const { query, type, state } = this.form.value 
    const options: TaskFilter = {
      query: query || "",
      type: type || "",
      state: state || "",
      page: this.page
    }
    console.log(query)
    try {
      let data: Task[] 
      if (!this.isAdmin) {
        const id = await this.authService.getCurrentUserId()
        data = await this.taskService.getParamsByUser(options, id)
        console.log(data)
      } else {
        data = await this.taskService.getParams(options)
      }
      this.loadTasks(data) 
    } catch (error) {
      this.snackBar.openSnackBar("Error al filtrar")   
    }
  }

  async delete(id: string) { 
    try {
      const data = await this.taskService.delete(id)
      this.snackBar.openSnackBar("Tarea borrada")   
      this.search()
    } catch (error) {
      this.snackBar.openSnackBar("Error al borrar")   
      
    }
  }

  async onPageChanged(event: { pageIndex: number }) {
    this.page = event.pageIndex 
    await this.search()
  }
}
