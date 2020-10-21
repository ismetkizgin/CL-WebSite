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
  p: number = 1;
  async ngOnInit() {
    try {
      this.users = <Array<User>>await this._userService.listAsync();
    } catch (error) {
      this._userService.errorNotification(error);
    }
  }

  async userDelete(UserID) {
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
          let notificationMessage: string;
          this._translateService
            .get('Institution information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._userService.errorNotification(error);
        }
      }
    });
  }
}
