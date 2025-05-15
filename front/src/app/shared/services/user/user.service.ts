import { Injectable } from '@angular/core';
import { urlProtected } from '../../env';
import { validResponse } from '../../../utils/utils';
export interface User {
  id: string
  name: string,
  password: string
  email: string,
  role: string
}
export interface UserFilter { 
  query: string,
  type: string,
  role: string,
  page: number
} 
export type UserCreate = Omit<User, "id">
export type UserEdit = Omit<User, "password">


@Injectable({
  providedIn: 'root'
})
export class UserService {

  async create(user: UserCreate) {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const body = JSON.stringify(user)
      console.log(body)
      const data = await fetch(`${urlProtected}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: body
      })
      console.log(data)
      validResponse(data.status)
      const d = await data.json() 
    } catch (error) {
      throw new Error("Error en la peticion")
      console.log('Error:', error);
    }  
  }
  

  async edit(user: User | UserEdit) {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const body = JSON.stringify(user)
      const data = await fetch(`${urlProtected}/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: body
      })
      validResponse(data.status)
      return await data.json()
    } catch (error) {
      throw new Error("Error en la peticion")
      console.log('Error:', error);
    }  
  }

  async delete(id: string) {
    const token = localStorage.getItem('token');
    if (!token) return ;
    try {
      const data = await fetch(`${urlProtected}/users/${id}?_dependent=tasks`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      validResponse(data.status)
    } catch (error) {
      throw new Error("Error en la peticion")
      console.log('Error:', error);
    }  
  }

  async get(): Promise<User[]> {
    let users: User[] = [] 
    const token = localStorage.getItem('token');
    if (!token) return [];
    try {
      const data = await fetch(`${urlProtected}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      validResponse(data.status)
      users = await data.json()
      
    } catch (error) {
      throw new Error("Error en la peticion")
      console.log('Error:', error);
    }  
    return users
  }

  async getAdmin(id: string): Promise<User[]> {
    let users: User[] = [] 
    const token = localStorage.getItem('token');
    if (!token) return [];
    try {
      const data = await fetch(`${urlProtected}/users?id_ne=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      validResponse(data.status)
      users = await data.json()
      
    } catch (error) {
      throw new Error("Error en la peticion")
      console.log('Error:', error);
    }  
    return users
  }
  
  async getByClient(): Promise<User[]> {
    let users: User[] = [] 
    const token = localStorage.getItem('token');
    if (!token) return [];
    try {
      const data = await fetch(`${urlProtected}/users?role=user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      validResponse(data.status)
      users = await data.json()
      
    } catch (error) {
      throw new Error("Error en la peticion")
      console.log('Error:', error);
    }  
    return users
  }

  async getFirst(): Promise<User[]> {
    let users: User[] = [] 
    const token = localStorage.getItem('token');
    if (!token) return [];
    try {
      const data = await fetch(`${urlProtected}/users?_page=1&_limit=10`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      validResponse(data.status)
      users = await data.json()
    } catch (error) {
      throw new Error("Error en la peticion")
      console.log('Error:', error);
    }  
    return users
  }

  async getById(id: string): Promise<UserEdit[]> {
    let users: User[] = [] 
    let response: any[]  = []
    const token = localStorage.getItem('token');
    if (!token) return [];
    try {
      const data = await fetch(`${urlProtected}/users?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      validResponse(data.status)
      users = await data.json()
      if (users.length > 0) {
      response = [{
          id: users[0].id,
          name: users[0].name,
          email: users[0].email,
          role: users[0].role
        }]
      }
    } catch (error) {
      throw new Error("Error en la peticion")
      console.log('Error:', error);
    }  
    return response
  }

  async getParamsAdmin(options: UserFilter, id: string): Promise<User[]> {
    let users: User[] = [] 
    let opt = ""
    const token = localStorage.getItem('token');
    if (!token) return [];
    console.log(options)
    if (options.query) {
      if (options.type == "name") {
        opt+= `name=${options.query}&`
      }
      if (options.type == "email") {
        opt+= `email=${options.query}&`
      } 
    }
    if (options.role) {
      opt+= `role=${options.role}&`
    } 
    if (options.page) {
      opt+= `_page=${options.page + 1}&_limit=10`
    }
    // opt = opt.length > 0 ? `?${opt}` : ""
    try {
      const data = await fetch(`${urlProtected}/users?id_ne=${id}&${opt}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      validResponse(data.status)
      users = await data.json()
    } catch (error) {
      throw new Error("Error en la peticion")
      console.log('Error:', error);
    }  
    return users
  }

  async getParams(options: UserFilter): Promise<User[]> {
    let users: User[] = [] 
    let opt = ""
    const token = localStorage.getItem('token');
    if (!token) return [];
    console.log(options)
    if (options.query) {
      if (options.type == "name") {
        opt+= `name=${options.query}&`
      }
      if (options.type == "email") {
        opt+= `email=${options.query}&`
      } 
    }
    if (options.role) {
      opt+= `role=${options.role}&`
    } 
    if (options.page) {
      opt+= `_page=${options.page + 1}&_limit=10`
    }
    opt = opt.length > 0 ? `?${opt}` : ""
    try {
      const data = await fetch(`${urlProtected}/users${opt}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      validResponse(data.status)
      users = await data.json()
    } catch (error) {
      throw new Error("Error en la peticion")
      console.log('Error:', error);
    }  
    return users
  }
}
