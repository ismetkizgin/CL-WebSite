import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {
  AddComponentMenuComponent,
  DialogWindowComponent,
} from '../../../components';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,

    private _dialog: MatDialog
  ) {}

  projectLists: Array<Project>;
  searchText: string;
  paginationConfig = {
    id: 'ProjectList',
    itemsPerPage: 10,
    currentPage: 1,
  };

  ngOnInit(): void {

  }

  openProjectListModal(ProjectID = null) {
    const diologRef = this._dialog.open(AddComponentMenuComponent, {
      width: '500px',
      data: this.projectLists.find(
        (projectList) => projectList.ProjectID == ProjectID
      ),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async projectListDelete(ProjectID) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the component ?',
        icon: 'fa fa-exclamation',
      },
    });

  }

} 