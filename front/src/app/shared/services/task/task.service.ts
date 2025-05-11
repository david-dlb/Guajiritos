import { Injectable } from "@angular/core";
import { urlProtected } from '../../env'
import { validResponse } from "../../../utils/utils";

export interface Task {
    id: string
    name: string,
    description: string
    state: string
    user: string
}
export interface TaskFilter {
  query: string
  type: string
  state: string
  page: number
}

export type TaskCreate = Omit<Task, "id">
@Injectable({
    providedIn: 'root'
})
export class TaskService {

  async create(task: TaskCreate) {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const body = JSON.stringify(task)
      const data = await fetch(`${urlProtected}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: body
      })
      validResponse(data.status)
      await data.json()
    } catch (error) {
      console.log('Error:', error);
    }  
  }
  

  async edit(task: Task) {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const body = JSON.stringify(task)
      const data = await fetch(`${urlProtected}/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: body
      })
      validResponse(data.status)
      await data.json()
    } catch (error) {
      console.log('Error:', error);
    }  
  }

  async delete(id: string) {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const data = await fetch(`${urlProtected}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      validResponse(data.status)
    } catch (error) {
      console.log('Error:', error);
    }  
  }

  async get(): Promise<Task[]> {
    let tasks: Task[] = [] 
    const token = localStorage.getItem('token');
    if (!token) return [];
    try {
      const data = await fetch(`${urlProtected}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      validResponse(data.status)
      tasks = await data.json()
    } catch (error) {
      console.log('Error:', error);
    }  
    return tasks
  }

  async getByUser(id: string): Promise<Task[]> {
    let tasks: Task[] = [] 
    const token = localStorage.getItem('token');
    if (!token) return [];
    try {
      const data = await fetch(`${urlProtected}/tasks?user=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      validResponse(data.status)
      tasks = await data.json()
    } catch (error) {
      console.log('Error:', error);
    }  
    return tasks
  }

  async getFirst(): Promise<Task[]> {
    let tasks: Task[] = [] 
    const token = localStorage.getItem('token');
    if (!token) return [];
    try {
      const data = await fetch(`${urlProtected}/tasks?_page=1&_limit=10`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      validResponse(data.status)
      tasks = await data.json()
    } catch (error) {
      console.log('Error:', error);
    }  
    return tasks
  }

  async getById(id: string): Promise<Task[]> {
    let tasks: Task[] = [] 
    const token = localStorage.getItem('token');
    if (!token) return [];
    try {
      const data = await fetch(`${urlProtected}/tasks?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      validResponse(data.status)
      tasks = await data.json()
    } catch (error) {
      console.log('Error:', error);
    }  
    return tasks
  }

  async getParams(options: TaskFilter): Promise<Task[]> {
    let tasks: Task[] = [] 
    let opt = ""
    const token = localStorage.getItem('token');
    if (!token) return []; 
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
    // if (options.page != null) {
    //   opt+= `_page=${options.page + 1}&_limit=10`
    // }
    opt = opt.length > 0 ? `?${opt}` : "" 
    try {
      const data = await fetch(`${urlProtected}/tasks${opt}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      validResponse(data.status)
      tasks = await data.json()
    } catch (error) {
      console.log('Error:', error);
    }  
    return tasks
  }

  async getParamsByUser(options: TaskFilter, id: string): Promise<Task[]> {
    let tasks: Task[] = [] 
    let opt = ""
    const token = localStorage.getItem('token');
    if (!token) return []; 
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
    // if (options.page != null) {
    //   opt+= `_page=${options.page + 1}&_limit=10`
    // }
    try {
      const data = await fetch(`${urlProtected}/tasks?user=${id}&${opt}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      validResponse(data.status)
      tasks = await data.json()
    } catch (error) {
      console.log('Error:', error);
    }  
    return tasks
  }
}