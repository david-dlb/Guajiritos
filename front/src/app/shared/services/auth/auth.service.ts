import { Inject, Injectable, PLATFORM_ID } from '@angular/core'; 
import { User } from '../user/user.service';
import { baseUrl, urlProtected } from '../../env'
import { isPlatformBrowser } from '@angular/common';
export interface Login {
  name: string
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {   
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  async login(data: Login): Promise<any> {
    try {
      const res = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        })
      });
      const responseData = await res.json();
      return responseData;
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error; // para que el error pueda ser manejado afuera si se desea
    }
  }

  async isAuthenticated() { 
    if (!this.isBrowser) {
      // No estamos en navegador, no hay localStorage
      return false;
    }

    let isAdmin = false
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    const email = getTokenEmail(token);
    if (!email) return false;
    try {
      const response = await fetch(`${urlProtected}/users?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }); 
      if (response.status !== 200) return false;
  
      const data = await response.json(); 
      return data.length > 0 ? true : false;
    } catch (error) {
      console.error('Error en adminGuard:', error);
      return false;
    }
    return isAdmin
  }
  
  async isAdmin() {
    if (!this.isBrowser) {
      // No estamos en navegador, no hay localStorage
      return false;
    }

    let isAdmin = false
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    const email = getTokenEmail(token);
    if (!email) return false;
    try {
      const response = await fetch(`${urlProtected}/users?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.status !== 200) return false;
  
      const data = await response.json(); 
      return data.length > 0 ? data[0].role == 'admin' : false;
    } catch (error) {
      console.error('Error en adminGuard:', error);
      return false;
    }
    return isAdmin
  }
}

function getTokenEmail(token: string): string | null {
  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson);
    return payload.email || null;
  } catch {
    return null;
  }
}