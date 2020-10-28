import { Component, OnInit } from '@angular/core';
import {User} from './profile-delete.model';

@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.scss']
})
export class ProfileDeleteComponent implements OnInit {

  constructor() { }

  _passwordShowHide: boolean = false;
  _model:User=new User();
  ngOnInit(): void {
  }

}
