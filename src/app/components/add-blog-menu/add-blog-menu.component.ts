import { Component, OnInit, Inject } from '@angular/core';
import { BlogMenu } from '../../models';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogMenuService } from '../../utils/services';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-blog-menu',
  templateUrl: './add-blog-menu.component.html',
  styleUrls: ['./add-blog-menu.component.scss'],
})
export class AddBlogMenuComponent implements OnInit {
  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _blogMenuService: BlogMenuService,
    public _router: Router,
    private dialogRef: MatDialogRef<AddBlogMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  _model: BlogMenu = new BlogMenu();
  _blogMenuListRenew: boolean = false;
  _action: Function;

  async ngOnInit() {
    if (this.data?.BlogMenuID != null) {
      try {
        this._model = this.data;
      } catch (error) {
        this._blogMenuService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    } else {
      this._blogMenuListRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(blogMenuForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (blogMenuForm.valid) {
      this._translateService
        .get('Blog menu registration completed')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(blogMenuForm))) return;
      this.dialogRef.close(this._blogMenuListRenew);
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
  async insertActionAsync(blogMenuForm: NgForm) {
    try {
      await this._blogMenuService.insertAsync(blogMenuForm.value);
      blogMenuForm.resetForm();
      this._blogMenuListRenew = true;
      return true;
    } catch (error) {
      this._blogMenuService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(blogMenuForm: NgForm) {
    try {
      await this._blogMenuService.updateAsync(
        Object.assign(blogMenuForm.value, {
          BlogMenuID: this.data.BlogMenuID,
        })
      );
      return true;
    } catch (error) {
      this._blogMenuService.errorNotification(error);
      return false;
    }
  }
}
