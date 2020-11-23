import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginWindowComponent } from '../../../login-window/login-window.component';

@Component({
  selector: 'app-client-navbar',
  templateUrl: './client-navbar.component.html',
  styleUrls: ['./client-navbar.component.scss'],
})
export class ClientNavbarComponent implements OnInit {
  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {}

  loginOpenModal() {
    this._dialog.open(LoginWindowComponent);
  }
}
