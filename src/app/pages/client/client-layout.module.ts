import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BlogCategoriesComponent } from '../../components/layouts/client/blog-categories/blog-categories.component';
import { FormsModule } from '@angular/forms';
import { MatModule, MustMatchDirective } from '../../utils';
import { NgSearchFilterModule } from 'ng-search-filter';
import {
  ClientLayoutComponent,
  ClientNavbarComponent,
  ClientFooterComponent,
  BlogLayoutComponent,
} from '../../components/layouts/client';
import {
  HomepageComponent,
  BlogsComponent,
  BlogDetailComponent,
  ChangePasswordComponent,
} from './';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    ClientLayoutComponent,
    BlogLayoutComponent,
    HomepageComponent,
    BlogsComponent,
    BlogCategoriesComponent,
    ClientNavbarComponent,
    ClientFooterComponent,
    BlogDetailComponent,
    ChangePasswordComponent,
    MustMatchDirective,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatModule,
    RouterModule,
    HttpClientModule,
    NgSearchFilterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
})
export class ClientLayoutModule {}
