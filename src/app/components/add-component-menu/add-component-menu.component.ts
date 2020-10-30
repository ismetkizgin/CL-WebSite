import { Component, OnInit, Inject } from '@angular/core';
import { ComponentMenu } from '../../models';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentMenuService } from '../../utils/services';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-component-menu',
  templateUrl: './add-component-menu.component.html',
  styleUrls: ['./add-component-menu.component.scss'],
})
export class AddComponentMenuComponent implements OnInit {
  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _componentMenuService: ComponentMenuService,
    public _router: Router,
    private dialogRef: MatDialogRef<AddComponentMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  _model: ComponentMenu = new ComponentMenu();
  _componentMenuListRenew: boolean = false;
  _action: Function;

  async ngOnInit() {
    if (this.data?.ComponentMenuID != null) {
      try {
        this._model = this.data;
      } catch (error) {
        this._componentMenuService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    } else {
      this._componentMenuListRenew = false;
      this._action = this.insertActionAsync;
    }
  }

  async onSave(componentForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (componentForm.valid) {
      this._translateService
        .get('Component menu registration completed')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(componentForm))) return;
      this.dialogRef.close(this._componentMenuListRenew);
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

  async insertActionAsync(componentForm: NgForm) {
    try {
      await this._componentMenuService.insertAsync(componentForm.value);
      componentForm.resetForm();
      this._componentMenuListRenew = true;
      return true;
    } catch (error) {
      this._componentMenuService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(componentForm: NgForm) {
    try {
      await this._componentMenuService.updateAsync(
        Object.assign(componentForm.value, {
          ComponentMenuID: this.data.ComponentMenuID,
        })
      );
      return true;
    } catch (error) {
      this._componentMenuService.errorNotification(error);
      return false;
    }
  }
}
