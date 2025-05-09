import { Component, inject } from "@angular/core";
import { Router, RouterLink, RouterOutlet, RouterModule } from "@angular/router";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
    standalone: true,
    imports: [RouterModule, RouterLink, RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule],
    selector: "app-layout", 
    templateUrl: './layout.component.html',
})
export default class LayoutComponent {
    private _router = inject(Router)
    logout() {

    }
}