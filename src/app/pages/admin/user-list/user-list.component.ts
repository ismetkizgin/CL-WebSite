import { Component, OnInit } from '@angular/core';
import {User} from './user-list.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor() { }

  users:Array<User>=[
    {UserFirstName:"furkan",UserLastName:"Söğüt",UserDateOfBirth:"03.09.1998",UserEmail:"furkan@gmail.com",UserTypeName:"xxx"},
    {UserFirstName:"Ezgi",UserLastName:"adsf",UserDateOfBirth:"03.09.1998",UserEmail:"furkan@gmail.com",UserTypeName:"xxx"},
    {UserFirstName:"Ceyda",UserLastName:"gdfs",UserDateOfBirth:"03.09.1998",UserEmail:"furkan@gmail.com",UserTypeName:"xxx"},
    {UserFirstName:"İsmet",UserLastName:"cvb",UserDateOfBirth:"03.09.1998",UserEmail:"furkan@gmail.com",UserTypeName:"xxx"},
  ]

  ngOnInit(): void {
    console.log(this.users);
  }

}
