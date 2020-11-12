import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BlogCategoriesComponent } from '../../components/layouts/client/blog-categories/blog-categories.component';
import {
  ClientLayoutComponent,
  ClientNavbarComponent,
  ClientFooterComponent,
  BlogLayoutComponent
} from '../../components/layouts/client';
import { 
  HomepageComponent,
  BlogsComponent,
  BlogDetailComponent
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
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
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
