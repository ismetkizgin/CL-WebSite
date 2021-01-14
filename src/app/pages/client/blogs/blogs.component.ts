import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models';
import { BlogService } from '../../../utils/services/blog/blog.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  constructor(
    private _blogService: BlogService,
    private _activateRoute: ActivatedRoute,
    private _router: Router
  ) {
    this._router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.ngOnInit();
        window.scrollTo(0, 0);
      }
    });
  }

  searchText: String;
  blogs: Array<Blog>;
  async ngOnInit() {
    const BlogMenuID = this._activateRoute.snapshot.paramMap.get('BlogMenuID');
    try {
      this.blogs = <Array<Blog>>await this._blogService.listAsync({
        BlogMenuID,
        BlogState: true,
      });
    } catch (error) {
      this._blogService.errorNotification(error);
    }
  }
}
