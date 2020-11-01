import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  constructor() {}

  @Input() statusCode: string;
  @Input() title: string;
  @Input() message: string;
  statusCodeSplit: Array<string>;

  ngOnInit(): void {
    if (this.statusCode) this.statusCodeSplit = this.statusCode.split('');
  }
}
