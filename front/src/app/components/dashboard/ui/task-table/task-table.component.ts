import { Component,ViewChild, effect, inject, Input, input, Signal } from '@angular/core';
import { Task, TaskFilter, TaskService } from '../../../../shared/services/task.service';
import {MatTableModule} from '@angular/material/table';

import { MatTableDataSource } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-task-table',
  imports: [MatTableModule, MatIcon,FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    RouterLink
  ],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.css'
})
export class TaskTableComponent {
  displayedColumns: string[] = ['nombre', 'descripcion', 'estado', 'usuario', 'editar'];
  @Input() tasks!: Task[];
  taskService = inject(TaskService)
  dataSource = new MatTableDataSource<Task>();

  totalItems = 0;
  pageSize = 5; // o el valor por default
  currentPage = 0;

  private _form = inject(FormBuilder)
  form = this._form.group({
    query: ["", Validators.required],
    type: ["", Validators.required],
    state: ["", Validators.required],
  }) 
  
  async ngOnInit() {
    this.tasks = await this.taskService.get()
    this.loadTasks(this.tasks);
  }

  async loadTasks(tasks: Task[]) { 
    this.dataSource.data =  tasks;
  } 

  async search() {
    const { query, type, state } = this.form.value 
    const options: TaskFilter = {
      query: query || "",
      type: type || "",
      state: state || ""
    }
    const data = await this.taskService.getParams(options)
    this.loadTasks(data) 
  }

  async delete(id: string) { 
    const data = await this.taskService.delete(id)
    this.search()
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex; 
  }
}
