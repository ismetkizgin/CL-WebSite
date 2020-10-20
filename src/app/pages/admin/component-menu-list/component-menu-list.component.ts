import { Component, OnInit } from '@angular/core';
import { ComponentMenu } from './component-menu-list.model';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../../components';

@Component({
  selector: 'app-component-menu-list',
  templateUrl: './component-menu-list.component.html',
  styleUrls: ['./component-menu-list.component.scss']
})
export class ComponentMenuListComponent implements OnInit {

  constructor( private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _dialog: MatDialog) { }
  componentMenus: Array<ComponentMenu>;
  searchText: string;
  ngOnInit(): void {
    this.componentMenus = [
      {
        ComponentMenuID: 1,
        ComponentMenuName: 'ceyda',
        ComponentMenuDescription: 'asds'
      }
    ]
  }

  async componentMenuDelete(componentMenuID) {
    let notification: any = {
      message: '',
      panelClass: 'notification__success',
    };
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the component menu ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      
        
    });
  }
}
