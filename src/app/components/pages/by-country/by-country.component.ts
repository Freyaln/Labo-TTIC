import {Component} from '@angular/core';
import { ChartType } from 'chart.js';
import {PopestiapiService} from "../../../services/popestiapi.service";
import {DataHandlingService} from "../../../services/data-handling.service";

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styleUrls: ['./by-country.component.scss']
})
export class ByCountryComponent {

  chartDataset: any;
  chartLabels: any;
  selectedType: ChartType = 'line';
  lineOptions = {
    responsive: true,
  };
  country: string = 'belgium';
  selectedDateStart: string = '03/01/2020';
  selectedDateEnd: string = '04/01/2020';
  deathsChecked: boolean = false;
  recoveredChecked: boolean = false;
  confirmedChecked: boolean = false;
  isLoaded: boolean = false;

  constructor(private _popestiapiService: PopestiapiService, private _dataHandlingService: DataHandlingService) {

      this.isLoaded = false;
      this._popestiapiService.getAllFromCountry(this.country, this.selectedDateStart, this.selectedDateEnd).subscribe({
      next: (data) => {
      this.isLoaded = true;
        this.chartDataset = this._dataHandlingService.countryDataHandler(data).dataset;
        this.chartLabels = this._dataHandlingService.countryDataHandler(data).labels;
    },
    error: (err) => {
      console.log(err.status);
    }
    })
  }

  onTick(isChecked: any) {
    this.isLoaded = false;

    this.deathsChecked = isChecked.deathsChecked;
    this.confirmedChecked = isChecked.confirmedChecked;
    this.recoveredChecked = isChecked.recoveredChecked;

    this._popestiapiService.getAllFromCountry(this.country, this.selectedDateStart, this.selectedDateEnd).subscribe({
      next: (data) => {
        this.isLoaded = true;
        this.chartDataset = [
          isChecked.deathsChecked ? this._dataHandlingService.countryDataHandler(data).dataset[0] : null,
          isChecked.confirmedChecked ? this._dataHandlingService.countryDataHandler(data).dataset[1] : null,
          isChecked.recoveredChecked ? this._dataHandlingService.countryDataHandler(data).dataset[2] : null
          ].filter(i => i !== null);
      },
        error: (err) => {
          console.log(err.status);
        }
      })
    if (!isChecked.deathsChecked && !isChecked.confirmedChecked && !isChecked.recoveredChecked) {
      this._popestiapiService.getAllFromCountry(this.country, this.selectedDateStart, this.selectedDateEnd).subscribe({
        next: (data) => {
          this.isLoaded = true;
          this.chartDataset = this._dataHandlingService.countryDataHandler(data).dataset;
          this.chartLabels = this._dataHandlingService.countryDataHandler(data).labels;
        },
        error: (err) => {
          console.log(err.status);
        }
      })
    }
  }

  onSelectType(value: any) {
    value === 'Line' ? this.selectedType = 'line' : this.selectedType = 'bar';
  }

  onDatePicked(value: any) {
    this.isLoaded = false;
    this.selectedDateStart = value.startingDate;
    this.selectedDateEnd = value.endingDate;
    this._popestiapiService.getAllFromCountry(this.country, this.selectedDateStart, this.selectedDateEnd).subscribe({
      next: (data) => {
        this.isLoaded = true;
        this.chartDataset = this._dataHandlingService.countryDataHandler(data).dataset;
        this.chartLabels = this._dataHandlingService.countryDataHandler(data).labels;
      },
      error: (err) => {
        console.log(err.status);
      }
    })
  }

  onSelectCountry(value: string) {
    this.isLoaded = false;
    this.country = value;
    this._popestiapiService.getAllFromCountry(this.country, this.selectedDateStart, this.selectedDateEnd).subscribe({
      next: (data) => {
        this.isLoaded = true;
        this.chartDataset = this._dataHandlingService.countryDataHandler(data).dataset;
        this.chartLabels = this._dataHandlingService.countryDataHandler(data).labels;
      },
      error: (err) => {
        console.log(err.status);
      }
    })
  }
}
