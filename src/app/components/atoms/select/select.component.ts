import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  @Input() type: string = '';
  @Input() optionsList: any[] = [];
  @Output() selectedValueChange = new EventEmitter<any>();

  selectedValue: any;

  onSelectValue() {
    this.selectedValueChange.emit(this.selectedValue);
    console.log(this.selectedValue)
  }
}

