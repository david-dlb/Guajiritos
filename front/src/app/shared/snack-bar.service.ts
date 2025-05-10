import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string) {
    this._snackBar.open(message, "X", {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  } 
  constructor() { }
}
