import { Routes } from '@angular/router';
import LoginComponent from './components/login/login.component';
import { UserComponent } from './components/dashboard/user/user.component';
import { loggedGuard, loginGuard } from './core/guard';

export const routes: Routes = [
    {
        path: "",
        canActivate: [loginGuard],
        component: LoginComponent
    }, 
    {
        path: "dashboard",
        canActivate: [loggedGuard],
        loadComponent: () => import('./shared/layauts/layaut.component'),
        loadChildren: () => import('./components/dashboard/dashboard.routes')
    },
];
