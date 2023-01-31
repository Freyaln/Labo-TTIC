import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss']
})
export class LinkListComponent {

  @Input() itemList : ListInterface[] = [];
  @Input() customClass: string = '';
  @Input() id: boolean = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
}

export interface ListInterface {
  label: string,
  link?: string
}
