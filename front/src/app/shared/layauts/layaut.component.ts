import { Component, inject } from "@angular/core";
import { Router, RouterLink, RouterOutlet, RouterModule } from "@angular/router";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from "../services/auth/auth.service";
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    imports: [RouterModule, RouterLink, RouterOutlet, CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
    selector: "app-layout", 
    templateUrl: './layout.component.html',
})
export default class LayoutComponent {
    private _router = inject(Router)
    authService = inject(AuthService)
    isAdmin = false

    async ngOnInit() {
        this.isAdmin = await this.authService.isAdmin() 
    }

    logout() {
        localStorage.removeItem('token');
        this._router.navigateByUrl("")
    }
}