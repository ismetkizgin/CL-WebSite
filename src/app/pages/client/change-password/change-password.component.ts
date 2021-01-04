import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePassword } from '../../../models/changePassword';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../utils';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
    public _router: Router,
    private _authService: AuthService
  ) {}

  _model: ChangePassword = new ChangePassword();
  ngOnInit(): void {}

  async onSave(changaPasswordForm: NgForm) {
    try {
      let notification: any = {
        message: '',
        panelClass: '',
      };
      if (changaPasswordForm.valid) {
        this._translateService
          .get('Your password has been changed successfully')
          .subscribe((value) => (notification.message = value));
        notification.panelClass = 'notification__success';
        const UserPassword = this._activatedRoute.snapshot.paramMap.get(
          'ForgotPasswordKey'
        );
        const UserEmail = this._activatedRoute.snapshot.paramMap.get(
          'UserEmail'
        );
        await this._authService.forgotChangePasswordAsync({
          UserPassword,
          UserEmail,
          UserNewPassword: changaPasswordForm.value.Password,
        });
        this._router.navigateByUrl('/');
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
    } catch (err) {
      this._authService.errorNotification(err);
    }
  }
}
