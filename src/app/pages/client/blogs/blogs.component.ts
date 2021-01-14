import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models';
import { BlogService } from '../../../utils/services/blog/blog.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  constructor(
    private _blogService: BlogService,
    private _activateRoute: ActivatedRoute
    ) { }
  searchText: String;
  blogsOriginal: Array<Blog>;
  blogs: Array<Blog>;
  async ngOnInit() {
    const BlogMenuID=this._activateRoute.snapshot.paramMap.get('BlogMenuID');
    try {
      this.blogsOriginal = <Array<Blog>>(await this._blogService.listAsync());
      this.blogs = this.blogsOriginal.filter((data) => data.BlogMenuID == BlogMenuID);
    } catch (error) {
      this._blogService.errorNotification(error);
    }
  }

}