import { Component, OnInit } from '@angular/core';
import { UserModel } from './user-add.model';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Roles } from '../../../models/roles';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, UserService, LanguageService } from '../../../utils';
import {
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'tr-TR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class UserAddComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _languageService: LanguageService,
    public _router: Router,
    private _dateAdapter: DateAdapter<any>
  ) {}

  _passwordShowHide: boolean = false;
  _model: UserModel = new UserModel();
  _action: Function;
  _UserTypeName = this._authService.currentUserValue.result.UserTypeName;
  lang: string = this._languageService.getLanguage() || 'tr';
  userRoles: Array<object> = [
    {
      userTypeName: 'Administrator',
      authorize: [Roles.Root].indexOf(this._UserTypeName) === -1 ? false : true,
    },
    {
      userTypeName: 'Developer',
      authorize:
        [Roles.Root, Roles.Administrator].indexOf(this._UserTypeName) === -1
          ? false
          : true,
    },
    {
      userTypeName: 'Editor',
      authorize:
        [Roles.Root, Roles.Administrator].indexOf(this._UserTypeName) === -1
          ? false
          : true,
    },
  ];

  async ngOnInit() {
    this._dateAdapter.setLocale(this.lang);
    const UserID = this._activatedRoute.snapshot.paramMap.get('UserID');
    if (UserID != null) {
      try {
        this._model = <any>await this._userService.findAsync(UserID);
      } catch (error) {
        this._userService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    } else if (this._router.isActive('/admin/user/profile', true)) {
      this._model = JSON.parse(
        JSON.stringify(this._authService.currentUserValue.result)
      );
      this._model.UserEmail = null;
      this._model.UserTypeName = null;
      this._action = this.updateProfileActionAsync;
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
      console.log(userForm);
      await this._userService.insertAsync(userForm.value);
      userForm.resetForm();
      return true;
    } catch (error) {
      this._userService.errorNotification(error);
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
      this._userService.errorNotification(error);
      return false;
    }
  }

  async updateProfileActionAsync(userForm: NgForm) {
    try {
      await this._authService.updateProfile(userForm.value);
      this._model.UserPassword = null;
      return true;
    } catch (error) {
      this._userService.errorNotification(error);
      return false;
    }
  }
}
