import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {

  @Input() chartType: any;
  @Input() datasets: any;
  @Input() labels: any;
  @Input() options: any;

}
