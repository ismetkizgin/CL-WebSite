import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../utils/services/blog/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _blogService: BlogService
  ) {}

  _model: Blog = new Blog();

  async ngOnInit() {
    const BlogID = this._activatedRoute.snapshot.paramMap.get('BlogID');
    if (BlogID != null) {
      try {
        this._model = <Blog>await this._blogService.findAsync(BlogID);
      } catch (error) {
        this._blogService.errorNotification(error);
      }
    }
  }
}
