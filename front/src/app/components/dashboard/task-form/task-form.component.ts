import { Component, inject } from '@angular/core';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {toSignal} from '@angular/core/rxjs-interop';

import {map} from 'rxjs/operators';
@Component({
  selector: 'app-task-form',
  imports: [MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterLink,
    MatButtonModule, ReactiveFormsModule, MatSelectModule, MatRadioModule, MatSnackBarModule, MatCardModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export default class TaskFormComponent {
  private _form = inject(FormBuilder)
  private _router = inject(Router)

  readonly hideRequiredControl = new FormControl(false);
  readonly floatLabelControl = new FormControl('auto' as FloatLabelType);

  protected readonly hideRequired = toSignal(this.hideRequiredControl.valueChanges);
  protected readonly floatLabel = toSignal(
    this.floatLabelControl.valueChanges.pipe(map(v => v || 'auto')),
    {initialValue: 'auto'},
  );
  form = this._form.group({
    name: ["", Validators.required],
    description: ["", Validators.required],
    state: ["", Validators.required],
    user: ["", Validators.required],
  })
  private _snackBar = inject(MatSnackBar);
  email: string = '';
  password: string = '';
  hide: boolean = true;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  } 
  constructor() {

  }
  submit() {
    console.log(this.form.getRawValue())
    const { name, description, state, user } = this.form.value 

    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        description: description,
        state: state,
        user: user
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data) {

      } else {
        console.log('Error:', data);
      }
    })
    .catch(error => console.error('Error en la petición:', error));
  }

  invalid() {
    return this.form.invalid
  }
}
