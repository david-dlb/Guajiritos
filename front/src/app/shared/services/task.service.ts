import { Injectable } from "@angular/core";

export interface Task {
    id: string
    name: string,
    description: string
    state: string
    user: string
}
export type TaskCreate = Omit<Task, "id">
@Injectable({
    providedIn: 'root'
})
export class TaskService {
    create(task: TaskCreate) {

    }
    edit(task: Task) {
        
    }
    delete(id: string) {
        
    }
    get(): Task[] {
        let tasks: Task[] = []
        fetch(`http://localhost:3000/tasks`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data) {
                tasks = data
            } else {
              console.log('Error:', data);
            }
          })
        return []
    }
}