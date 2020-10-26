import { Component, OnInit } from '@angular/core';
import { BlogMenu } from './blog-menu-list.model';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {
  AddComponentComponent,
  DialogWindowComponent,
} from '../../../components';
import { ComponentMenuService } from '../../../utils/services';

@Component({
  selector: 'app-blog-menu-list',
  templateUrl: './blog-menu-list.component.html',
  styleUrls: ['./blog-menu-list.component.scss'],
})
export class BlogMenuListComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    
    private _dialog: MatDialog
  ) {}

  blogMenus: Array<BlogMenu>;
  searchText: string;
  paginationConfig = {
    id: 'BlogMenuList',
    itemsPerPage: 10,
    currentPage: 1,
  };

  async ngOnInit() {
   
  }

  openBlogMenuModal(BlogMenuID = null) {
    const diologRef = this._dialog.open(AddComponentComponent, {
      width: '500px',
      data: this.blogMenus.find(
        (blogMenu) => blogMenu.BlogMenuID == BlogMenuID
      ),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  }

