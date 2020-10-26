import { Component, OnInit } from '@angular/core';
import { ComponentList } from './component-list.model';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {
  AddComponentComponent,
  DialogWindowComponent,
} from '../../../components';
@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss'],
})
export class ComponentListComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
  
    private _dialog: MatDialog
  ) {}

  componentLists: Array<ComponentList>;
  searchText: string;
  paginationConfig = {
    id: 'ComponentList',
    itemsPerPage: 10,
    currentPage: 1,
  };

  ngOnInit(): void {
    
  }

  openComponentListModal(ComponentID = null) {
    const diologRef = this._dialog.open(AddComponentComponent, {
      width: '500px',
      data: this.componentLists.find(
        (componentList) => componentList.ComponentID == ComponentID
      ),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async componentListDelete(ComponentID) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the component ?',
        icon: 'fa fa-exclamation',
      },
    });
  
  }

}