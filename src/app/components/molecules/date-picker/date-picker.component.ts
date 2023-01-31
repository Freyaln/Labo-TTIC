import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  @Output() selectedDate = new EventEmitter<{
    startingDate: string;
    endingDate: string;
  }>();

  startingDate: string = '';
  endingDate: string = '';

  onDateSelected(startDate: HTMLInputElement, endDate: HTMLInputElement) {
    this.startingDate = startDate.value;
    this.endingDate = endDate.value;
    this.selectedDate.emit({
      startingDate: this.startingDate,
      endingDate: this.endingDate,
    });
  }
}
