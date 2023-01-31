import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checbox-selector',
  templateUrl: './checbox-selector.component.html',
  styleUrls: ['./checbox-selector.component.scss'],
})
export class ChecboxSelectorComponent {
  @Input() deathsChecked: boolean = false;
  @Input() recoveredChecked: boolean = false;
  @Input() confirmedChecked: boolean = false;

  @Output() BoxChecked = new EventEmitter<{
    deathsChecked: boolean;
    recoveredChecked: boolean;
    confirmedChecked: boolean;
  }>();

  onCheckboxChange() {
    this.BoxChecked.emit({
      deathsChecked: this.deathsChecked,
      recoveredChecked: this.recoveredChecked,
      confirmedChecked: this.confirmedChecked,
    });
  }
}
