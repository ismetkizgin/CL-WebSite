import { Component, OnInit } from '@angular/core';
import { ComponentMenu } from './component-menu-list.model';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../../components';
import { ComponentMenuService } from '../../../utils/services';

@Component({
  selector: 'app-component-menu-list',
  templateUrl: './component-menu-list.component.html',
  styleUrls: ['./component-menu-list.component.scss']
})
export class ComponentMenuListComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _componentMenuService: ComponentMenuService,
    private _dialog: MatDialog) { }
  componentMenus: Array<ComponentMenu>;
  searchText: string;
  paginationConfig = {
    id: 'ComponentMenuList',
    itemsPerPage: 10,
    currentPage: 1,
  };
  async ngOnInit() {
    try {
      this.componentMenus = <Array<ComponentMenu>>await this._componentMenuService.listAsync();
    } catch (error) {
      this._componentMenuService.errorNotification(error);
    }
  }
  openComponentEditModal(ComponentMenuID){
    this._dialog.open(DialogWindowComponent,{
      width:"500px",
      data: { ComponentMenuID },
    });
  }

  async componentMenuDelete(ComponentMenuID) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the user ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._componentMenuService.deleteAsync({ ComponentMenuID });
          this.componentMenus.splice(
            this.componentMenus.findIndex((ComponentMenu) => ComponentMenu.ComponentMenuID == ComponentMenuID),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Component menu was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._componentMenuService.errorNotification(error);
        }
      }
    });
  }
}
