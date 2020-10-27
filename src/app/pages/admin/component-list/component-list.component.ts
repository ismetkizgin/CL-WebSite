import { Component, OnInit } from '@angular/core';
import { ComponentModel } from './component-list.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../../components';
import { ComponentService } from '../../../utils/services';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss'],
})
export class ComponentListComponent implements OnInit {
  constructor(
    private _dialog: MatDialog,
    private _componentService: ComponentService
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
  }
}
