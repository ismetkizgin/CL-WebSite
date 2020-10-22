import { Component, OnInit,Inject } from '@angular/core';
import { ComponentProperty } from './add-component.model';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentMenuService } from '../../utils/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.scss']
})
export class AddComponentComponent implements OnInit {

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _componentMenuService:ComponentMenuService,
    private _activatedRoute: ActivatedRoute,
    public _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  _model: ComponentProperty = new ComponentProperty();

  _action: Function;
  async ngOnInit() {
    console.log(this.data.ComponentMenuID);
    if (this.data.ComponentMenuID != null) {
      try {
        this._model = <any>await this._componentMenuService.findAsync(this.data.ComponentMenuID);
        console.log(this._model)
      } catch (error) {
        this._componentMenuService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    } else {
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
        .get('User registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(componentForm))) return;
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
      console.log(componentForm);
      await this._componentMenuService.insertAsync(componentForm.value);
      componentForm.resetForm();
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
          ComponentMenuID: this.data.ComponentMenuID
        })
      );
      return true;
    } catch (error) {
      this._componentMenuService.errorNotification(error);
      return false;
    }
  }

}
