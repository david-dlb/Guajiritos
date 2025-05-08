import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import TaskComponent from "./task/task.component";
import TaskFormComponent from "./task-form/task-form.component";

export default [
  {
    path: "task",
    component: TaskComponent,
  },
  {
    path: "task-form", 
    component: TaskFormComponent,
  },
  {
    path: "user", 
    component: UserComponent,
  }
]  as Routes