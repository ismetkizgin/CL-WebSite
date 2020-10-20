import { Component, OnInit } from '@angular/core';
import { ComponentMenu } from './component-menu-list.model';

@Component({
  selector: 'app-component-menu-list',
  templateUrl: './component-menu-list.component.html',
  styleUrls: ['./component-menu-list.component.scss']
})
export class ComponentMenuListComponent implements OnInit {

  constructor() { }
  componentMenus: Array<ComponentMenu>;
  searchText: string;
  ngOnInit(): void {
    this.componentMenus = [
      {
        ComponentMenuID: 1,
        ComponentMenuName: 'ceyda',
        ComponentMenuDescription: 'asds'
      }
    ]
  }
}
