import { Component, OnInit } from '@angular/core';
import { User } from './user-list.model';
import { UserService } from '../../../utils';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../../components';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _dialog: MatDialog
  ) {}

  users: Array<User>;
  searchText: string;

  async ngOnInit() {
    try {
      this.users = <Array<User>>await this._userService.listAsync();
    } catch (error) {
      this._userService.errorNotification(error);
    }
  }

  async userDelete(UserID) {
    let notification: any = {
      message: '',
      panelClass: 'notification__success',
    };
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the user ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._userService.deleteAsync({ UserID });
          this.users.splice(
            this.users.findIndex((user) => user.UserID == UserID),
            1
          );
          this._translateService
            .get('Institution information was successfully deleted')
            .subscribe((value) => (notification.message = value));
        } catch (error) {
          console.log(error);
          notification.panelClass = 'notification__error';
          switch (error.status) {
            case 401:
              this._translateService
                .get('Unauthorized transaction !')
                .subscribe((value) => (notification.message = value));
              break;
            case 417:
              this._translateService
                .get('Please enter correct institution information !')
                .subscribe((value) => (notification.message = value));
              break;
            case 407:
              window.location.reload();
              break;
            default:
              this._translateService
                .get(
                  'Server error occurred, please try again later If the error persists, we ask you to report this to the authorities'
                )
                .subscribe((value) => (notification.message = value));
              break;
          }
        } finally {
          this._snackBar.open(notification.message, 'X', {
            duration: 3000,
            panelClass: notification.panelClass,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        }
      }
    });
  }
}
