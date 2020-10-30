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
      linkActive: [
        '/admin/component-menus',
        '/admin/components',
        '/admin/component/add',
      ],
      submenuShowHide: this.getChildUrlActiveState([
        'component-menus',
        'components',
        'component',
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
        {
          title: 'Add Componwent',
          icon: 'fa fa-address-book',
          link: '/admin/component/add',
        },
      ],
      authorize: [
        Roles.Root,
        Roles.Administrator,
        Roles.Developer,
        Roles.User,
        Roles.Editor,
      ],
    },
    {
      title: 'Blog Transections',
      icon: 'fa fa-user',
      linkActive: ['/admin/blog-menus', '/admin/blog/add', '/admin/blogs'],
      submenuShowHide: this.getChildUrlActiveState([
        'blog-menus',
        'blog',
        'blogs',
      ]),
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
        {
          title: 'Blog Add',
          icon: 'fa fa-address-book',
          link: '/admin/blog/add',
        },
      ],
      authorize: [Roles.Root, Roles.Administrator, Roles.Editor],
    },
    {
      title: 'Project Transections',
      icon: 'fa fa-user',
      linkActive: ['/admin/projects'],
      submenuShowHide: this.getChildUrlActiveState(['projects']),
      submenu: [
        {
          title: 'Project List',
          icon: 'fa fa-address-book',
          link: '/admin/projects',
        },
      ],
      authorize: [Roles.Root, Roles.Administrator],
    },
  ];

  getChildUrlActiveState(path: string[]) {
    return path.find((x) => x == this._url.split('/')[2]) ? true : false;
  }
}
