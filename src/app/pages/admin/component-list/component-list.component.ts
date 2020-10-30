import { Component, OnInit } from '@angular/core';
import { ComponentModel } from '../../../models';
import { MatDialog } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../../components';
import { ComponentService } from '../../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss'],
})
export class ComponentListComponent implements OnInit {
  constructor(
    private _dialog: MatDialog,
    private _componentService: ComponentService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService
  ) {}

  components: Array<ComponentModel>;
  searchText: string;
  paginationConfig = {
    id: 'ComponentList',
    itemsPerPage: 10,
    currentPage: 1,
  };

  async ngOnInit() {
    try {
      this.components = <Array<ComponentModel>>(
        await this._componentService.listAsync()
      );
    } catch (error) {
      this._componentService.errorNotification(error);
    }
  }

  async componentDelete(ComponentID) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the component ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._componentService.deleteAsync({ ComponentID });
          this.components.splice(
            this.components.findIndex(
              (component) => component.ComponentID == ComponentID
            ),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Component information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._componentService.errorNotification(error);
        }
      }
    });
  }
}
