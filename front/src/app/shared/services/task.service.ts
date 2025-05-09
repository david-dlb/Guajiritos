import { Injectable } from "@angular/core";

export interface Task {
    id: string
    name: string,
    description: string
    state: string
    user: string
}
export interface TaskFilter {
  query: string,
  type: string
  state: string
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
    async delete(id: string) {
      try {
        const data = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        })
      } catch (error) {
        console.log('Error:', error);
      }  
    }
    async get(): Promise<Task[]> {
      let tasks: Task[] = [] 
      try {
        const data = await fetch(`http://localhost:3000/tasks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        tasks = await data.json()
      } catch (error) {
        console.log('Error:', error);
      }  
      return tasks
    }
    async getParams(options: TaskFilter): Promise<Task[]> {
      let tasks: Task[] = [] 
      let opt = ""
      console.log(options)
      if (options.query) {
        if (options.type == "name") {
          opt+= `name=${options.query}&`
        }
        if (options.type == "description") {
          opt+= `description=${options.query}&`
        }
        if (options.type == "user") {
          opt+= `user=${options.query}&`
        }
      }
      if (options.state) {
        opt+= `state=${options.state}&`
      }
      opt = opt.length > 0 ? `?${opt}` : ""
      try {
        const data = await fetch(`http://localhost:3000/tasks${opt}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        tasks = await data.json()
      } catch (error) {
        console.log('Error:', error);
      }  
      return tasks
    }
}