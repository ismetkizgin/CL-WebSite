import { Component, OnInit } from '@angular/core';
import { UserModel } from './user-add.model';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthService,
  UserService
} from '../../../utils/services';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _userService:UserService,
    private _activatedRoute: ActivatedRoute,
    public _router: Router,
  ) { }

  _passwordShowHide: boolean = false;
  _model: UserModel = new UserModel();
  _action: Function;
  

  userRoles: Array<object> = [
    {
      userStatusName: 'Administrator',
    },
    {
      userStatusName: 'Developer',
    },
    {
      userStatusName: 'Editor',
    },
  ];
  async ngOnInit() {
    const UserID = this._activatedRoute.snapshot.paramMap.get('UserID');
    if (UserID != null) {
      try {
        this._model = <any>await this._userService.findAsync(UserID);
      } catch (error) {
        this.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    } else {
      this._action = this.insertActionAsync;
    }
  }
  async onSave(userForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (userForm.valid) {
      this._translateService
        .get('User registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(userForm))) return;
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
  }
  onAutomaticPasswordGeneration(): void {
    this._model.UserPassword = this._authService.creatingPassword(8);
    this._passwordShowHide = true;
  }
  onPasswordToggle(): void {
    if (this._passwordShowHide) this._passwordShowHide = false;
    else this._passwordShowHide = true;
  }

  async insertActionAsync(userForm: NgForm) {
    try {
      await this._userService.insertAsync(userForm.value);
      userForm.resetForm();
      return true;
    } catch (error) {
      this.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(userForm: NgForm) {
    try {
      await this._userService.updateAsync(
        Object.assign(userForm.value, {
          UserID: parseInt(
            this._activatedRoute.snapshot.paramMap.get('UserID')
          ),
        })
      );
      return true;
    } catch (error) {
      this.errorNotification(error);
      return false;
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
      case 409:
        this._translateService
          .get('Such an user is already registered in the system !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 417:
        this._translateService
          .get('Please enter correct user information !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 404:
        this._translateService
          .get('Such a user is not registered in the system !')
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
      duration: 4000,
      panelClass: 'notification__error',
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

}
