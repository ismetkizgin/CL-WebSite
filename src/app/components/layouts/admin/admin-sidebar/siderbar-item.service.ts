import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from '../../../../models/roles';

@Injectable({
  providedIn: 'root',
})
export class SidebarItemService {
  constructor(private _router: Router) {}

  _url = this._router.routerState.snapshot.url;
  menu: Array<object> = [
    {
      title: 'Dashboard',
      icon: 'fa fa-tachometer-alt',
      link: '/admin',
    },
    {
      title: 'User Transactions',
      icon: 'fa fa-user',
      linkActive: ['/admin/users', '/admin/user/add'],
      submenuShowHide: this.getChildUrlActiveState(['user', 'users']),
      submenu: [
        {
          title: 'User List',
          icon: 'fa fa-address-book',
          link: '/admin/users',
        },
        {
          title: 'User Add',
          icon: 'fa fa-user-plus',
          link: '/admin/user/add',
        },
      ],
      authorize: [Roles.Root, Roles.Administrator],
    },
    {
      title: 'Component Transections',
      icon: 'fa fa-user',
      linkActive: ['/admin/component-menus', '/admin/components'],
      submenuShowHide: this.getChildUrlActiveState([
        'component-menus',
        'components',
      ]),
      submenu: [
        {
          title: 'Component Menu List',
          icon: 'fa fa-address-book',
          link: '/admin/component-menus',
          authorize: [Roles.Root, Roles.Administrator],
        },
        {
          title: 'Component List',
          icon: 'fa fa-address-book',
          link: '/admin/components',
        },
      ],
      authorize: [Roles.Root, Roles.Administrator, Roles.Developer],
    },
    {
      title: 'Blog Transections',
      icon: 'fa fa-user',
      linkActive: ['/admin/blog-menus'],
      submenuShowHide: this.getChildUrlActiveState(['blog-menus']),
      submenu: [
        {
          title: 'Blog Menu List',
          icon: 'fa fa-address-book',
          link: '/admin/blog-menus',
          authorize: [Roles.Root, Roles.Administrator],
        },
        {
          title: 'Blog List',
          icon: 'fa fa-address-book',
          link: '/admin/blogs',
        },
      ],
      authorize: [Roles.Root, Roles.Administrator, Roles.Editor],
    },
  ];

  getChildUrlActiveState(path: string[]) {
    return path.find((x) => x == this._url.split('/')[2]) ? true : false;
  }
}
