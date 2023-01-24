import {Component} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {ICompaniesResult, PopestiapiService} from "../../../services/popestiapi.service";
import {DataHandlingService } from "../../../services/data-handling.service";
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
  optionsWithDisplay: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        ticks: { color: 'white' }
      },
      x: {
        ticks: { color: 'white' }
      }
    }
  };
  optionsWithoutDisplay: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: { color: 'white' }
      },
      x: {
        ticks: { color: 'white' }
      }
    }
  };

  isDevsLoaded: boolean = false;
  isYearlyLoaded: boolean = false;
  isQuarterlyLoaded: boolean = false;

  developers: ICompaniesResult[] = [];
  developersName: string[] = [];
  gamesCountDatas: any;
  gamesDataset: any;
  gamesLabels: any;
  nextPage: string = '';
  previousPage: string | null= '';
  symbol: string = '';
  annualEarnings: any;
  annualDataset: any;
  annualLabels: any;
  quarterlyEarnings: any;
  quarterlyDataset: any;
  quarterlyLabels: any;

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
        this.isDevsLoaded = true;
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

    this._popestiapiService.getAnnualEarnings('ATVI').subscribe({
      next: (data) => {
      this.isYearlyLoaded = true;
      this.annualEarnings = this._dataHandlingService.annualEarningsDataHandler(data);
      this.annualDataset = this.annualEarnings.dataset;
      this.annualLabels = this.annualEarnings.labels;
      this.isQuarterlyLoaded = true;
      this.quarterlyEarnings = this._dataHandlingService.quarterlyEarningsDataHandler(data);
      this.quarterlyDataset = this.quarterlyEarnings.dataset;
      this.quarterlyLabels = this.quarterlyEarnings.labels;
    }
  })
  }

  getNewPage(next: string) {
    this._popestiapiService.getPage(next).subscribe({
      next: (data) => {
        this.isDevsLoaded = true;
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

  onSelectSymbol(target: string) {
    target === 'Activision Blizzard' ? this.symbol = 'ATVI' : null;
    target === 'Electronic Arts' ? this.symbol = 'EA' : null;
    target === 'SONY Corporation' ? this.symbol = 'SONY' : null;
    target === 'Take-Two Interactive Software Inc (2K games)' ? this.symbol = 'TTWO' : null;
    this._popestiapiService.getAnnualEarnings(this.symbol).subscribe({
      next: (data) => {
        this.isYearlyLoaded = true;
        this.annualEarnings = this._dataHandlingService.annualEarningsDataHandler(data);
        this.annualDataset = this.annualEarnings.dataset;
        this.annualLabels = this.annualEarnings.labels;
        this.isQuarterlyLoaded = true;
        this.quarterlyEarnings = this._dataHandlingService.quarterlyEarningsDataHandler(data);
        this.quarterlyDataset = this.quarterlyEarnings.dataset;
        this.quarterlyLabels = this.quarterlyEarnings.labels;
      }
    })
  }
}
