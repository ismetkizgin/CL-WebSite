import { Component, OnInit } from '@angular/core';
import { BlogMenu } from './blog-menu-list.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BlogMenuService } from '../../../utils/services';

@Component({
  selector: 'app-blog-menu-list',
  templateUrl: './blog-menu-list.component.html',
  styleUrls: ['./blog-menu-list.component.scss'],
})
export class BlogMenuListComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _blogMenuService: BlogMenuService
  ) {}

  blogMenus: Array<BlogMenu>;
  searchText: string;
  paginationConfig = {
    id: 'BlogMenuList',
    itemsPerPage: 10,
    currentPage: 1,
  };

  async ngOnInit() {
    try {
      this.blogMenus = <Array<BlogMenu>>await this._blogMenuService.listAsync();
    } catch (error) {
      this._blogMenuService.errorNotification(error);
    }
  }
}
