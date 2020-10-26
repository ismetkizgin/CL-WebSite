import { NgModule } from '@angular/core';
import { Routes, RouterModule, ChildActivationEnd } from '@angular/router';
import {
  ClientLayoutComponent,
  AdminLayoutComponent,
} from './components/layouts';
import {
  HomepageComponent,
  DashboardComponent,
  LoginComponent,
  UserListComponent,
  ComponentMenuListComponent,
  UserAddComponent,
  ComponentListComponent,
} from './pages';
import { AuthGuard } from './utils/guards';
import { Roles } from './models/roles';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [{ path: '', component: HomepageComponent }],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
          icon: 'fa fa-2x fa-home',
          authorize: [
            Roles.Root,
            Roles.Administrator,
            Roles.Developer,
            Roles.Editor,
          ],
        },
      },
      {
        path: 'users',
        component: UserListComponent,
        data: {
          title: 'User List',
          icon: 'fa fa-2x fa-address-book',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
      {
        path: 'user/add',
        component: UserAddComponent,
        data: {
          title: 'User Add',
          icon: 'fa fa-2x fa-home',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
      {
        path: 'user/profile',
        component: UserAddComponent,
        data: {
          title: 'User Add',
          icon: 'fa fa-2x fa-home'
        }
      },
      {
        path: 'user/edit/:UserID',
        component: UserAddComponent,
        data: {
          title: 'Edit User Information',
          icon: 'fa fa-2x fa-user-edit',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
      {
        path: 'component-menus',
        component: ComponentMenuListComponent,
        data: {
          title: 'Component Menu List',
          icon: 'fa fa-2x fa-address-book',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
      {
        path: 'component-list',
        component: ComponentListComponent,
        data: {
          title: 'Component List',
          icon: 'fa fa-2x fa-address-book',
          authorize: [Roles.Root, Roles.Administrator,Roles.Developer],
        },
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'ismet w' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [];
