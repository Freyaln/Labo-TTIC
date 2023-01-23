import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss']
})
export class LinkListComponent {

  @Input() itemList : ListInterface[] = [];
  @Input() customClass: string = '';
}

export interface ListInterface {
  label: string,
  link?: string
}
