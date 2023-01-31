import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() submit: boolean = false;
  @Input() customClass: string = '';
  @Input() children: any = '';
  @Output() onClick: EventEmitter<any> = new EventEmitter();
}

