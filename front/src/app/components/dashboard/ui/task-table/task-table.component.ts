import { Component,ViewChild, effect, inject, Input, input, Signal } from '@angular/core';
import { Task, TaskFilter, TaskService } from '../../../../shared/services/task.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';

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
import PaginatorComponent from '../paginator/paginator.component';

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
    RouterLink,
    PaginatorComponent
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
  private page = 0

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
      state: state || "",
      page: this.page
    }
    const data = await this.taskService.getParams(options)
    this.loadTasks(data) 
  }

  async delete(id: string) { 
    const data = await this.taskService.delete(id)
    this.search()
  }

  onPageChanged(event: { pageIndex: number }) {
    this.page = event.pageIndex
    this.search()
  }
}
