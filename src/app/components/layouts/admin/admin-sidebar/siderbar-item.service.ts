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
      title: 'User Transactions',
      icon: 'fas fa-users',
      linkActive: ['/admin/users', '/admin/user/add'],
      submenuShowHide: this.getChildUrlActiveState(['user', 'users']),
      submenu: [
        {
          title: 'User List',
          icon: 'fas fa-list-ul',
          link: '/admin/users',
        },
        {
          title: 'User Add',
          icon: 'fas fa-user-plus',
          link: '/admin/user/add',
        },
      ],
      authorize: [Roles.Root, Roles.Administrator],
    },
    {
      title: 'Component Transactions',
      icon: 'nav-icon fas fa-th',
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
          icon: 'fas fa-list-alt',
          link: '/admin/component-menus',
          authorize: [Roles.Root, Roles.Administrator],
        },
        {
          title: 'Component List',
          icon: 'fas fa-list',
          link: '/admin/components',
        },
        {
          title: 'Add Component',
          icon: 'far fa-plus-square',
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
      title: 'Blog Transactions',
      icon: 'fas fa-blog',
      linkActive: ['/admin/blog-menus', '/admin/blog/add', '/admin/blogs'],
      submenuShowHide: this.getChildUrlActiveState([
        'blog-menus',
        'blog',
        'blogs',
      ]),
      submenu: [
        {
          title: 'Blog Menu List',
          icon: 'fas fa-stream',
          link: '/admin/blog-menus',
          authorize: [Roles.Root, Roles.Administrator],
        },
        {
          title: 'Blog List',
          icon: 'fas fa-list',
          link: '/admin/blogs',
        },
        {
          title: 'Blog Add',
          icon: 'fas fa-plus',
          link: '/admin/blog/add',
        },
      ],
      authorize: [Roles.Root, Roles.Administrator, Roles.Editor],
    },
    {
      title: 'Project Transactions',
      icon: 'fas fa-lightbulb',
      linkActive: ['/admin/projects'],
      submenuShowHide: this.getChildUrlActiveState(['projects']),
      submenu: [
        {
          title: 'Project List',
          icon: 'fas fa-clipboard-list',
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
