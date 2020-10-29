import { Component, OnInit } from '@angular/core';
import { ComponentProperty } from './component-add.model';
import { LanguageService } from '../../../utils';
import { ComponentMenuService, ComponentService, AuthService } from '../../../utils/services';
import { ComponentMenu } from 'src/app/components/add-component-menu/add-component-menu.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Roles } from '../../../models/roles';


@Component({
  selector: 'app-component-add',
  templateUrl: './component-add.component.html',
  styleUrls: ['./component-add.component.scss']
})
export class ComponentAddComponent implements OnInit {

  constructor(
    private _languageService: LanguageService,
    private _componentMenuService: ComponentMenuService,
    private _activatedRoute: ActivatedRoute,
    private _componentService: ComponentService,
    public _router: Router,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _authService: AuthService,
  ) { }

  _action: Function;
  lang: string = this._languageService.getLanguage() || 'tr';
  _UserTypeName = this._authService.currentUserValue.result.UserTypeName;
  componentMenu: Array<ComponentMenu>;
  _model: ComponentProperty = new ComponentProperty();
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
      this.componentMenu =<Array<ComponentMenu>> await this._componentMenuService.listAsync();
    } catch (error) {
      this._componentService.errorNotification(error);
      this._router.navigateByUrl('admin');
    }
    const ComponentID = this._activatedRoute.snapshot.paramMap.get('ComponentID');
    if (ComponentID != null) {
      try {
        this._model = <any>await this._componentService.findAsync(ComponentID);
      } catch (error) {
        this._componentService.errorNotification(error);
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
  async insertAsync(componentForm: NgForm) {
    alert("çalıştı");
    try {
      await this._componentService.insertAsync(componentForm.value);
      componentForm.resetForm();
      return true;
    } catch (error) {
      this._componentService.errorNotification(error);
      return false;
    }
  }

  async updateAsync(componentForm: NgForm) {
    try {
      await this._componentService.updateAsync(
        Object.assign(componentForm.value, {
          ComponentID: parseInt(
            this._activatedRoute.snapshot.paramMap.get('ComponentID')
          ),
        })
      );
      return true;
    } catch (error) {
      this._componentService.errorNotification(error);
      return false;
    }
  }
}
