import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';

export const loggedGuard: CanActivateFn = async (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => { 
  const service = inject(AuthService) 
  return await service.isAuthenticated();  
}

export const loginGuard: CanActivateFn = async (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => { 
  const service = inject(AuthService) 
  return !(await service.isAuthenticated()) 
}

export const adminGuard: CanActivateFn = async (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => { 
  const service = inject(AuthService) 
  return await service.isAdmin(); 
  
}