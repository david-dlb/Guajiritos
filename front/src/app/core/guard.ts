import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';

export const loggedGuard: CanActivateFn = async (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => { 
  const service = inject(AuthService) 
  const router = inject(Router);
  const isAuthenticated = await service.isAuthenticated(); 
  if (isAuthenticated) {
    return true; // permite activar la ruta
  } else {
    // redirige a la ruta deseada, por ejemplo '/login' o '/not-authorized'
    return router.createUrlTree(['']);
  }
}

export const loginGuard: CanActivateFn = async (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => { 
  const service = inject(AuthService) 
  const router = inject(Router);
  const isAdmin = await service.isAdmin(); 
  if (!isAdmin) {
    return true; // permite activar la ruta
  } else {
    console.log("hoola")
    // redirige a la ruta deseada, por ejemplo '/login' o '/not-authorized'
    return router.createUrlTree(['/dashboard/task']);
  }
}

export const adminGuard: CanActivateFn = async (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => { 
  const service = inject(AuthService) 
  const router = inject(Router);
  const isAdmin = await service.isAdmin(); 
  if (isAdmin) {
    return true; // permite activar la ruta
  } else {
    // redirige a la ruta deseada, por ejemplo '/login' o '/not-authorized'
    return router.createUrlTree(['']);
  }
}