import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../../components/layouts/admin/admin-layout/admin-layout.component';
import { AdminFooterComponent } from '../../components/layouts/admin/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from '../../components/layouts/admin/admin-header/admin-header.component';
import { AdminControlSidebarComponent } from '../../components/layouts/admin/admin-control-sidebar/admin-control-sidebar.component';
import { AdminSidebarComponent } from '../../components/layouts/admin/admin-sidebar/admin-sidebar.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSearchFilterModule } from 'ng-search-filter';
import {
  DialogWindowComponent,
  PaginationComponent,
  AddComponentMenuComponent,
  PasswordChangeComponent,
  AddBlogMenuComponent,
  PasswordControlWindowComponent,
  ErrorComponent,
  LoginWindowComponent,
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
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    CKEditorModule,
    MatFormFieldModule,
    MatMomentDateModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatDialogModule,
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
  exports: [PaginationComponent, MatDialogModule],
})
export class AdminLayoutModule {}
