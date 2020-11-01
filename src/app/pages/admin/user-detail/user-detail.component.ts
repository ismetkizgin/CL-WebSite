import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, UserService } from '../../../utils/services';
import { Roles, User } from '../../../models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    public _router: Router,
    private _userService: UserService,
    private _authService: AuthService
  ) {}

  user: User = new User();
  UserID = this._activatedRoute.snapshot.paramMap.get('UserID');
  blogTabAuthorize: Array<any> = [Roles.Root, Roles.Administrator, Roles.Editor];
  componentTabAuthorize: Array<any> = [Roles.Root, Roles.Administrator, Roles.Developer];

  async ngOnInit() {
    try {
      this.user = <User>await this._userService.findAsync(this.UserID);
    } catch (error) {
      this._userService.errorNotification(error);
    }
  }
}
