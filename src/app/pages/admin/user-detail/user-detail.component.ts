import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../utils/services';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    public _router: Router,
    private _userService: UserService,
  ) { }

  user: any;

  async ngOnInit() {
    const UserID = this._activatedRoute.snapshot.paramMap.get('UserID');
    try {
      this.user = <any>await this._userService.findAsync(UserID);
    } catch (error) {
      this._userService.errorNotification(error);
    }
  }

}
