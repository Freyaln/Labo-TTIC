import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() itemList :any[] | undefined = [];
  @Input() customClass: string = '';

}
