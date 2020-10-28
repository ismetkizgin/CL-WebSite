import { Component, OnInit } from '@angular/core';
import { User } from './password-control-window.model';

@Component({
  selector: 'app-password-control-window',
  templateUrl: './password-control-window.component.html',
  styleUrls: ['./password-control-window.component.scss']
})
export class PasswordControlWindowComponent implements OnInit {

  constructor() { }

  _passwordShowHide: boolean = false;
  _model:User=new User();
  ngOnInit(): void {
  }

}
