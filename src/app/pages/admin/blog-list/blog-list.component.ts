import { Component, OnInit } from '@angular/core';
import { BlogList } from './blog-list.model';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BlogService } from '../../../utils/services/blog/blog.service';
import {
  AddBlogMenuComponent,
  DialogWindowComponent,
} from '../../../components';
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _blogService: BlogService,
    private _dialog: MatDialog
  ) { }

  blogLists: Array<BlogList>;
  searchText: string;
  paginationConfig = {
    id: 'BlogList',
    itemsPerPage: 10,
    currentPage: 1,
  };

  async ngOnInit() {
    try {
      this.blogLists = <Array<BlogList>>(
        await this._blogService.listAsync()
      );
    } catch (error) {
      this._blogService.errorNotification(error);
    }
    console.log(this.blogLists);
  }

  openBlogListModal(BlogID = null) {
    const diologRef = this._dialog.open(AddBlogMenuComponent, {
      width: '500px',
      data: this.blogLists.find(
        (blogList) => blogList.BlogID == BlogID
      ),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async blogListDelete(BlogID) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the blog ?',
        icon: 'fa fa-exclamation',
      },
    });

  }

} 