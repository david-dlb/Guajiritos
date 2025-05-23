import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import TaskFormComponent from "./task-form/task-form.component";
import { UserFormComponent } from "./user-form/user-form.component";
import { adminGuard, loggedGuard } from "../../core/guard";
import { TaskComponent } from "./task/task.component";
import { RenderMode } from "@angular/ssr";
import { inject } from "@angular/core";
import { UserService } from "../../shared/services/user/user.service";

export default [
  {
    path: "task",
    canActivate: [loggedGuard],

 
    component: TaskComponent,
  },
  {
    path: "task-form", 
    canActivate: [loggedGuard],   renderMode: RenderMode.Client, 
    component: TaskFormComponent,
  },
  {
    path: "task-form/:id", 
    canActivate: [loggedGuard], renderMode: RenderMode.Client, 
    component: TaskFormComponent,
  },
  {
    path: "user-form", 
    canActivate: [adminGuard],
    component: UserFormComponent,
  },
  {
    path: "user-form/:id", 
    canActivate: [adminGuard],
    component: UserFormComponent,
  },
  {
    path: "user", 
    canActivate: [adminGuard],
    component: UserComponent,
  }
]  as Routes