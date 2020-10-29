import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Roles } from '../../../models/roles';
import { LanguageService } from '../../../utils';
import { AuthService, BlogMenuService, BlogService } from '../../../utils/services';
import { Blog } from './blog-add.model';
import { BlogMenu } from 'src/app/components/add-blog-menu/add-blog-menu.model';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.scss']
})
export class BlogAddComponent implements OnInit {

  constructor(
    private _languageService: LanguageService,
    private _blogService: BlogService,
    private _activatedRoute: ActivatedRoute,
    private _blogMenuService: BlogMenuService,
    public _router: Router,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _authService: AuthService,
  ) { }

  _action: Function;
  lang: string = this._languageService.getLanguage() || 'tr';
  _UserTypeName = this._authService.currentUserValue.result.UserTypeName;
  blogMenu: Array<BlogMenu>;
  _model: Blog = new Blog();
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
    try {
      this.blogMenu = <Array<BlogMenu>>await this._blogMenuService.listAsync();
    } catch (error) {
      this._blogMenuService.errorNotification(error);
      this._router.navigateByUrl('admin');
    }
    const BlogID = this._activatedRoute.snapshot.paramMap.get('BlogID');
    if (BlogID != null) {
      try {
        this._model = <any>await this._blogService.findAsync(BlogID);
      } catch (error) {
        this._blogService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateAsync;
    } else if (this._router.isActive('/admin/user/profile', true)) {
      this._model = JSON.parse(
        JSON.stringify(this._authService.currentUserValue.result)
      );
      this._action = this.updateAsync;
    } else {
      this._action = this.insertAsync;
    }
  }
  async onSave(blogForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (blogForm.valid) {
      this._translateService
        .get('Blog registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(blogForm))) return;
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
  async insertAsync(blogForm: NgForm) {
    try {
      await this._blogService.insertAsync(blogForm.value);
      blogForm.resetForm();
      return true;
    } catch (error) {
      this._blogService.errorNotification(error);
      return false;
    }
  }

  async updateAsync(blogForm: NgForm) {
    try {
      await this._blogService.updateAsync(
        Object.assign(blogForm.value, {
          BlogID: parseInt(
            this._activatedRoute.snapshot.paramMap.get('BlogID')
          ),
        })
      );
      return true;
    } catch (error) {
      this._blogService.errorNotification(error);
      return false;
    }
  }
}

