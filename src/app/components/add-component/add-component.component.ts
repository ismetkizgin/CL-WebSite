import { Component, OnInit } from '@angular/core';
import { ComponentProperty } from './add-component.model';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.scss']
})
export class AddComponentComponent implements OnInit {

  constructor() { }

  components: ComponentProperty={ComponentName:"",ComponentDescription:""};

  ngOnInit(): void {
  }

}
