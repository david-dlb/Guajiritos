import { Component, effect, Input, input, Signal } from '@angular/core';
import { Task } from '../../../../shared/services/task.service';
import {MatTableModule} from '@angular/material/table';

import { MatTableDataSource } from '@angular/material/table';

 
@Component({
  selector: 'app-task-table',
  imports: [MatTableModule],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.css'
})
export class TaskTableComponent {
  displayedColumns: string[] = ['nombre', 'descripcion', 'estado', 'usuario', 'editar', "borrar"];
  @Input() tasks!: Task[];

  dataSource = new MatTableDataSource<Task>();

  ngOnInit() {
    this.dataSource.data = this.tasks;
  }
}
