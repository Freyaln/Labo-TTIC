import {Component} from '@angular/core';
import { ChartType } from 'chart.js';
import {ICompaniesResult, PopestiapiService} from "../../../services/popestiapi.service";
import {DataHandlingService } from "../../../services/data-handling.service";
import {ListInterface} from "../../atoms/link-list/link-list.component";
import {ISymbol} from "../../molecules/option-selector/option-selector.component";

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
  developersNameId: ListInterface[] = [];
  gamesCountDatas: any;
  gamesDataset: any;
  gamesLabels: any;
  nextPage: string = '';
  previousPage: string | null= '';
  symbol: string = '';

  symbolList: ISymbol[] = [
    {
    cName: 'Activision Blizzard',
    cSymbol: 'ATVI'
  },
    {
      cName: 'Electronic Arts',
      cSymbol: 'EA'
    },
    {
      cName: 'SONY Corporation',
      cSymbol: 'SONY'
    },
    {
      cName: 'Take-Two Interactive Software Inc (2K games)',
      cSymbol: 'TTWO'
    },
  ]

  constructor(private _popestiapiService: PopestiapiService, private _dataHandlingService: DataHandlingService) {

    this._popestiapiService.getAllCompanies().subscribe({
      next: (data) => {
        this.isLoaded = true;
        this.developers = data.results;
        this.developersNameId = this._dataHandlingService.developersNameIdToLink(data.results);
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
        this.isLoaded = true;
        this.developers = data.results;
        this.developersNameId = this._dataHandlingService.developersNameIdToLink(data.results);
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

  onSelectSymbol(target: string) {
    target === 'Activision Blizzard' ? this.symbol = 'ATVI' : null;
    target === 'Electronic Arts' ? this.symbol = 'EA' : null;
    target === 'SONY Corporation' ? this.symbol = 'SONY' : null;
    target === 'Take-Two Interactive Software Inc (2K games)' ? this.symbol = 'TTWO' : null;
    this._popestiapiService.getAnnualEarnings(this.symbol).subscribe({
      next: (data) => {
        console.log(data)
      }
    })
  }
}
