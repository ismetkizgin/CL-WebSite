import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChangePassword } from './password-change.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _authService: AuthService,
    private dialogRef:MatDialogRef<PasswordChangeComponent>
  ) { }

  _model: ChangePassword = new ChangePassword();
  _passwordShowHide: boolean = false;
  ngOnInit(): void {}

  async onSave(changePasswordForm: NgForm) {
    try {
      let notification: any = {
        message: '',
        panelClass: '',
      };
      if (changePasswordForm.valid) {
        this._translateService
          .get('The user password has been updated')
          .subscribe((value) => (notification.message = value));
        notification.panelClass = 'notification__success';
        await this._authService.changePassword(changePasswordForm.value);
        this.dialogRef.close();
      } else {
        this._translateService
          .get('Please fill in the required fields')
          .subscribe((value) => (notification.message = value));
        notification.panelClass = 'notification__error';
      }
      this._snackBar.open(notification.message, 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: notification.panelClass,
      });
    } catch (error) {
      this.errorNotification(error);
    }
  }

  errorNotification(error) {
    let errorMessage: string;
    switch (error.status) {
      case 401:
        this._translateService
          .get('Unauthorized transaction !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 417:
        this._translateService
          .get('Please add a correct file type !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 400:
        this._translateService
          .get('Your active password does not match !')
          .subscribe((value) => (errorMessage = value));
        break;
      default:
        this._translateService
          .get(
            'Server error occurred, please try again later If the error persists, we ask you to report this to the authorities'
          )
          .subscribe((value) => (errorMessage = value));
        break;
    }
    this._snackBar.open(errorMessage, 'X', {
      duration: 3000,
      panelClass: 'notification__error',
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
