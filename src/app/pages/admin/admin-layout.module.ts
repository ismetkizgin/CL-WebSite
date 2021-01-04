import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSearchFilterModule } from 'ng-search-filter';
import { MatModule } from '../../utils';
import {
  DialogWindowComponent,
  PaginationComponent,
  AddComponentMenuComponent,
  PasswordChangeComponent,
  AddBlogMenuComponent,
  PasswordControlWindowComponent,
  ErrorComponent,
  LoginWindowComponent,
  AdminLayoutComponent,
  AdminFooterComponent,
  AdminHeaderComponent,
  AdminControlSidebarComponent,
  AdminSidebarComponent,
} from '../../components';
import {
  DashboardComponent,
  UserListComponent,
  LoginComponent,
  BlogAddComponent,
  ComponentMenuListComponent,
  ComponentAddComponent,
  UserAddComponent,
  BlogMenuListComponent,
  ComponentListComponent,
  ProjectListComponent,
  BlogListComponent,
  UserDetailComponent,
} from '.';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AdminLayoutComponent,
    UserListComponent,
    ComponentAddComponent,
    DashboardComponent,
    AddComponentMenuComponent,
    BlogAddComponent,
    AddBlogMenuComponent,
    PasswordControlWindowComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminControlSidebarComponent,
    AdminSidebarComponent,
    UserAddComponent,
    DialogWindowComponent,
    LoginComponent,
    ComponentMenuListComponent,
    PasswordChangeComponent,
    PaginationComponent,
    BlogMenuListComponent,
    ComponentListComponent,
    ProjectListComponent,
    BlogListComponent,
    UserDetailComponent,
    ErrorComponent,
    LoginWindowComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule,
    CKEditorModule,
    NgxPaginationModule,
    NgSearchFilterModule,
    MatModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  exports: [PaginationComponent],
})
export class AdminLayoutModule {}
