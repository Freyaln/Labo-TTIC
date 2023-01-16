import {Component, EventEmitter, Output} from '@angular/core';
import * as moment from 'moment';
import {PopestiapiService} from "../../../services/popestiapi.service";

@Component({
  selector: 'app-live-cases',
  templateUrl: './live-cases.component.html',
  styleUrls: ['./live-cases.component.scss']
})
export class LiveCasesComponent {

  @Output() chartType = new EventEmitter<any>();
  @Output() datasets = new EventEmitter<any>();
  @Output() labels = new EventEmitter<any>();
  @Output() options = new EventEmitter<any>();

  dataFromCountry: any[] = [];
  dateToFetch = '2022-07-01';
  liveDataset: any;
  liveLabels: any;
  lineOptions = {
    responsive: true,
  };
  LabelAndColor = {
    label: "Latest datas",
    backgroundColor: ['rgb(136,40,40)'],
    borderColor: 'rgb(0,0,0)'
  };
  country: string = 'france';
  isLoaded: boolean = false;

  constructor(private _popestiapiService: PopestiapiService) {

    this.datasets.emit(this.liveDataset);
    this.labels.emit(this.liveLabels);
    this.options.emit(this.lineOptions);

    this.isLoaded = false;
    console.log(this.isLoaded)
    this._popestiapiService.getLiveCasesByCountry(this.country, this.dateToFetch).subscribe({
      next: (data) => {
        this.isLoaded = true;
        console.log(this.isLoaded)
        this.dataFromCountry = data;
        const cumulatedDatas: any[] = [];
        this.dataFromCountry.forEach((point) => {
          const monthNames = moment.months();
          const date = moment(point.Date);
          const month = date.month();
          const monthName = monthNames[month];
          const amount = point.Confirmed;

          // Check if an object for this month already exists in the array
          const existingMonth = cumulatedDatas.find(monthData => monthData.month === monthName);
          if (existingMonth) {
            //Output only the highest
            existingMonth.amount = Math.max(existingMonth.amount, amount);
          } else {
            cumulatedDatas.push({ month: monthName, amount });
          }
        });

        this.liveDataset = [{
          data: cumulatedDatas.map((i) => i.amount),
          label: this.LabelAndColor.label,
          backgroundColor: this.LabelAndColor.backgroundColor,
          borderColor: this.LabelAndColor.borderColor
        }];
        this.liveLabels = cumulatedDatas.map((i) => i.month)
      },
      error: (err) => {
        console.log(err.status);
      }
    })
  }

  onSelectCountry(value: string) {
    this.country = value;
    this.isLoaded = false;
    console.log(this.isLoaded)
    this._popestiapiService.getLiveCasesByCountry(this.country, this.dateToFetch).subscribe({
      next: (data) => {
        this.isLoaded = true;
        console.log(this.isLoaded)
        this.dataFromCountry = data;
        const cumulatedDatas: any[] = [];
        this.dataFromCountry.forEach((point) => {
          const monthNames = moment.months();
          const date = moment(point.Date);
          const month = date.month();
          const monthName = monthNames[month];
          const amount = point.Confirmed;

          // Check if an object for this month already exists in the array
          const existingMonth = cumulatedDatas.find(monthData => monthData.month === monthName);
          if (existingMonth) {
            //Output only the highest
            existingMonth.amount = Math.max(existingMonth.amount, amount);
          } else {
            cumulatedDatas.push({ month: monthName, amount });
          }
        });

        this.liveDataset = [{
          data: cumulatedDatas.map((i) => i.amount),
          label: this.LabelAndColor.label,
          backgroundColor: this.LabelAndColor.backgroundColor,
          borderColor: this.LabelAndColor.borderColor
        }];
        this.liveLabels = cumulatedDatas.map((i) => i.month)
      },
      error: (err) => {
        console.log(err.status);
      }
    })
  }
}
