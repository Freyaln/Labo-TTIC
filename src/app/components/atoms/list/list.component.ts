import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() itemList :ListInterface[] = [];
  @Input() customClass: string = '';
  @Output() onClick: EventEmitter<any> = new EventEmitter();

}

export interface ListInterface {
  label: string,
  link?: string
}
