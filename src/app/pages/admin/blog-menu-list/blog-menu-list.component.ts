import { Component, OnInit } from '@angular/core';
import { BlogMenu } from '../../../models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BlogMenuService } from '../../../utils/services';
import {
  AddBlogMenuComponent,
  DialogWindowComponent,
} from '../../../components';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blog-menu-list',
  templateUrl: './blog-menu-list.component.html',
  styleUrls: ['./blog-menu-list.component.scss'],
})
export class BlogMenuListComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _translateService: TranslateService,
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

  openBlogMenuModal(BlogMenuID = null) {
    const diologRef = this._dialog.open(AddBlogMenuComponent, {
      width: '500px',
      data: this.blogMenus.find(
        (blogMenu) => blogMenu.BlogMenuID == BlogMenuID
      ),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async blogMenuDelete(BlogMenuID) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the blog menu ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._blogMenuService.deleteAsync({ BlogMenuID });
          this.blogMenus.splice(
            this.blogMenus.findIndex(
              (blogMenu) => blogMenu.BlogMenuID == BlogMenuID
            ),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Blog menu information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._blogMenuService.errorNotification(error);
        }
      }
    });
  }
}
