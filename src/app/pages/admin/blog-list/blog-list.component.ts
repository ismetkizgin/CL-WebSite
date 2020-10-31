import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../models';
import { MatDialog } from '@angular/material/dialog';
import { BlogService } from '../../../utils';
import { DialogWindowComponent } from '../../../components';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  constructor(
    private _blogService: BlogService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService
  ) {}

  blogs: Array<Blog>;
  searchText: string;
  paginationConfig = {
    id: 'BlogList',
    itemsPerPage: 10,
    currentPage: 1,
  };

  async ngOnInit() {
    try {
      this.blogs = <Array<Blog>>await this._blogService.listAsync();
      console.log(this.blogs);
    } catch (error) {
      this._blogService.errorNotification(error);
    }
  }

  async blogDelete(BlogID) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the blog ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._blogService.deleteAsync({ BlogID });
          this.blogs.splice(
            this.blogs.findIndex((blog) => blog.BlogID == BlogID),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Blog information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._blogService.errorNotification(error);
        }
      }
    });
  }
}
