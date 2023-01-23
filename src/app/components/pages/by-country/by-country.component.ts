import {Component} from '@angular/core';
import { ChartType } from 'chart.js';
import {ICompaniesResult, PopestiapiService} from "../../../services/popestiapi.service";
import {DataHandlingService, Idataset} from "../../../services/data-handling.service";

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styleUrls: ['./by-country.component.scss']
})
export class ByCountryComponent {

  chartDataset: any;
  chartLabels: any;
  selectedType: ChartType = 'bar';
  gamesOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };
  isLoaded: boolean = false;

  developers: ICompaniesResult[] = [];
  developersName: string[] = [];
  gamesCountDatas: any;
  gamesDataset: any;
  gamesLabels: any;
  nextPage: string = '';
  previousPage: string | null= '';

  constructor(private _popestiapiService: PopestiapiService, private _dataHandlingService: DataHandlingService) {

    this._popestiapiService.getAllCompanies().subscribe({
      next: (data) => {
        console.log(data)
        this.isLoaded = true;
        this.developers = data.results;
        this.developersName = data.results.map((i) => i.name);
        this.gamesCountDatas = this._dataHandlingService.gamesCountDataHandler(data.results);
        this.gamesDataset = this.gamesCountDatas.dataset;
        this.gamesLabels = this.gamesCountDatas.labels;
        this.nextPage = data.next!;
      },
      error: (err) => {
        console.log(err.status);
      }
    })
  }

  getNewPage(next: string) {
    this._popestiapiService.getPage(next).subscribe({
      next: (data) => {
        console.log(data)
        this.isLoaded = true;
        this.developers = data.results;
        this.developersName = data.results.map((i) => i.name);
        this.gamesCountDatas = this._dataHandlingService.gamesCountDataHandler(data.results);
        this.gamesDataset = this.gamesCountDatas.dataset;
        this.gamesLabels = this.gamesCountDatas.labels;
        this.nextPage = data.next!;
        data.previous != null ? this.previousPage = data.previous : null;
      },
      error: (err) => {
        console.log(err.status);
      }
    })
  }
}
