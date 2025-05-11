import { Component, ViewChild, effect, inject, Input, input, Signal } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';

import {} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { User, UserFilter, UserService } from '../../../shared/services/user/user.service';
import { SnackBarService } from '../../../shared/snack-bar.service';
import { MatCardModule } from '@angular/material/card';
 

@Component({
  selector: 'app-user',
  imports: [MatTableModule, MatIcon,FormsModule,
      ReactiveFormsModule,
      MatCheckboxModule,
      MatRadioModule,CommonModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatButtonModule,
      MatPaginatorModule,
      MatCardModule,
      RouterLink,
      ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
displayedColumns: string[] = ['nombre', 'descripcion', 'estado', 'editar'];
  options: { value: string; label: string }[] = [{
    value: "name",
    label: "Nombre:"
  },
  {
    value: "email",
    label: "Correo:"
  },
  ];
  @Input() users!: User[];
  userService = inject(UserService)
  dataSource = new MatTableDataSource<User>();
  isAdmin = false
  totalItems = 0;
  pageSize = 5; // o el valor por default
  currentPage = 0;

  private snackBar = inject(SnackBarService);
  

  private _form = inject(FormBuilder)
  form = this._form.group({
    query: ["", Validators.required],
    type: ["", Validators.required],
    role: ["", Validators.required],
  }) 
  private page = 0


  async ngOnInit() { 
    this.users = await this.userService.get()
    this.loadUsers(this.users);
  }

  async loadUsers(users: User[]) { 
    this.dataSource.data = users;
  } 

  async search() {
    const { query, type, role } = this.form.value 
    const options: UserFilter = {
      query: query || "",
      type: type || "",
      role: role || "",
      page: this.page
    }
    try {
      const data = await this.userService.getParams(options)
      this.loadUsers(data) 
    } catch (error) {
      this.snackBar.openSnackBar("Error al enviar")   
    }
  }

  async delete(id: string) { 
    try {
      
    const data = await this.userService.delete(id)
    this.search()
    } catch (error) {
      
      this.snackBar.openSnackBar("Error al enviar")   
    }
  }

  onPageChanged(event: { pageIndex: number }) {
    this.page = event.pageIndex
    this.search()
  }
}
