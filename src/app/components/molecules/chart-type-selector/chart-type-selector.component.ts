import {Component, EventEmitter, Output} from '@angular/core';
import {ChartType} from "chart.js";

@Component({
  selector: 'app-chart-type-selector',
  templateUrl: './chart-type-selector.component.html',
  styleUrls: ['./chart-type-selector.component.scss']
})
export class ChartTypeSelectorComponent {

  @Output() selectedType = new EventEmitter<any>();

  chartList: string[] = ['Bar', 'Line'];
  type: ChartType = 'line';


  onSelectType(value: any) {
    this.type = value;
    this.selectedType.emit(this.type);
  }
}
