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
import PaginatorComponent from '../ui/paginator/paginator.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Task, TaskFilter, TaskService } from '../../../shared/services/task/task.service';
import { SnackBarService } from '../../../shared/snack-bar.service';
 

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
    RouterLink,
    PaginatorComponent
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
    console.log(1, "init")
    this.tasks = await this.taskService.getFirst()
    this.loadTasks(this.tasks);
    this.isAdmin = await this.authService.isAdmin() 
    if (this.isAdmin) {
      this.displayedColumns.splice(2, 0, 'usuario');
      this.options.splice(1, 0, { value: 'user', label: 'Usuario' });
    }
  }

  async loadTasks(tasks: Task[]) { 
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
    try {  
      const data = await this.taskService.getParams(options)
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
