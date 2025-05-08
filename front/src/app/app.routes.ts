import { Routes } from '@angular/router';
import LoginComponent from './components/login/login.component';
import { privateGuard } from './core/guard';
import { UserComponent } from './components/dashboard/user/user.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "user",
        component: UserComponent
    },
    {
        canActivateChild: [privateGuard()],
        path: "dashboard",
        loadComponent: () => import('./shared/layauts/layaut.component'),
        loadChildren: () => import('./components/dashboard/dashboard.routes')
    },
];
