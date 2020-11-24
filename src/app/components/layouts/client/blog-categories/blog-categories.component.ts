import { Component, OnInit } from '@angular/core';
import { BlogMenu } from 'src/app/models';
import { BlogMenuService } from '../../../../utils/services/blog-menu/blog-menu.service';

@Component({
  selector: 'app-blog-categories',
  templateUrl: './blog-categories.component.html',
  styleUrls: ['./blog-categories.component.scss']
})
export class BlogCategoriesComponent implements OnInit {

  constructor(
    private _blogMenuService:BlogMenuService,
  ) { }

  _categories: Array<BlogMenu>;

  async ngOnInit(){
    this._categories =<Array<BlogMenu>> await this._blogMenuService.listAsync();
  }

  openNav() {
    document.getElementById("mySidenav").style.cssText = 'width:250px !important'
  }

  closeNav() {
    document.getElementById("mySidenav").removeAttribute('style')
  }
}
