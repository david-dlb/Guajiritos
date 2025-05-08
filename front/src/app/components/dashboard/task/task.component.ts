import { Component, inject } from '@angular/core';
import { TaskTableComponent } from '../ui/task-table/task-table.component';
import { Task, TaskService } from '../../../shared/services/task.service';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-task',
  imports: [TaskTableComponent, RouterLink, MatButtonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export default class TaskComponent {
  taskService = inject(TaskService)
  tasks: Task[] = [];

  ngOnInit() {
    this.loadTasks();
  }

  async loadTasks() {
    this.task  = await this.taskService.get() 
  }

  add() {
    
  }
}
