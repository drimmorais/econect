import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class SnackBar {

    public horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    public verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor( private _snackBar: MatSnackBar) { }

    openSuccess(title: string) {
        this._snackBar.open(title, 'x', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['mat-toolbar', 'mat-success'],
            duration: 3000,
        });
    }

    openError(title: string) {
        this._snackBar.open(title, 'x', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['mat-toolbar', 'mat-warn'],
            duration: 3000,
        });
    }
}