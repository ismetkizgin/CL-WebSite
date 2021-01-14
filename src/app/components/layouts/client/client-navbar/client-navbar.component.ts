import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginWindowComponent } from '../../../login-window/login-window.component';
import { AuthService, BlogMenuService } from '../../../../utils';
import { PasswordChangeComponent } from '../../../password-change/password-change.component';
import { BlogMenu } from 'src/app/models';

@Component({
  selector: 'app-client-navbar',
  templateUrl: './client-navbar.component.html',
  styleUrls: ['./client-navbar.component.scss'],
})
export class ClientNavbarComponent implements OnInit {
  constructor(
    private _dialog: MatDialog,
    private _authService: AuthService,
    private _blogMenuService: BlogMenuService
    ) {}

  blogMenus: Array<BlogMenu>;

  async ngOnInit() {
    try{
      this.blogMenus= <Array<BlogMenu>> await this._blogMenuService.listAsync();
    }catch(error){
      this._blogMenuService.errorNotification(error);
    }
  }

  userInformation = this._authService.currentUserValue?.result;
  loginOpenModal() {
    this._dialog.open(LoginWindowComponent);
  }

  openPasswordChangeWindow() {
    this._dialog.open(PasswordChangeComponent, {
      width: '400px',
    });
  }
  

  async signout() {
    await this._authService.logout();
  }
}
