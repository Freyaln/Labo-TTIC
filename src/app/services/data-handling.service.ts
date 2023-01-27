import { Injectable } from '@angular/core';
import {ICompaniesResult, IGamesGenres, IGenreRequest, PopestiapiService} from "./popestiapi.service";

@Injectable({
  providedIn: 'root'
})
export class DataHandlingService {

  // @ts-ignore
  processedPercentage: Idataset;
  // @ts-ignore
  processedGamesCountDatas: Idataset;
  // @ts-ignore
  processedFinancialDatas: Idataset;
  // @ts-ignore
  preProcessedAnnualEarningsDatas: IAEarnings;
  // @ts-ignore
  processedAnnualEarningsDatas: Idataset;
  // @ts-ignore
  preProcessedQuarterlyEarningsDatas: IQEarnings;
  // @ts-ignore
  processedQuarterlyEarningsDatas: Idataset;
  // @ts-ignore
  processedGamesGenresDatas: Idataset;


  constructor(private _popestiapiService: PopestiapiService) {}

  randomRGB() {
    // No fluos output
    let r = Math.floor(Math.random() * 128);
    let g = Math.floor(Math.random() * 128);
    let b = Math.floor(Math.random() * 128);
    // No grey-ish output
    if (r === g && g === b) {
      r += r < 128 ? 1 : -1;
    }
    return `rgb(${r}, ${g}, ${b})`;
  }
  randomRGBa(transparency: string) {
    let r = Math.floor(Math.random() * 192);
    let g = Math.floor(Math.random() * 192);
    let b = Math.floor(Math.random() * 192);
    // No grey-ish output
    if (r === g && g === b) {
      r += r < 128 ? 1 : -1;
    }
    return `rgb(${r}, ${g}, ${b}, ${transparency})`;
  }

  percentageGamesbyGenreDataHandler(datas: IGamesGenres[]) {
    const totalCount = datas.reduce((acc, genre) => acc + genre.games_count, 0);
    const averageCount = totalCount / datas.length;
    let percentages: number[] = []
    datas.forEach(genre => {
      const percentage = (genre.games_count / totalCount) * 100;
      percentages.push(+percentage.toFixed(2))
    }),

      this.processedPercentage = {
        dataset: [{
          data: percentages.sort((a, b) => b -a),
          label: 'Total games percentage',
          backgroundColor: datas.map((i) => this.randomRGBa('0.7')),
          borderColor: datas.map((i) => this.randomRGB())
        }],
        labels: datas.map((i) => i.name)
      };
    return this.processedPercentage;
  }

  gamesCountDataHandler(datas: ICompaniesResult[]) {
    this.processedGamesCountDatas = {
      dataset: [{
        data: datas.map((i) => i.games_count),
        label: '',
        backgroundColor: datas.map((i) => this.randomRGB())
      }],
      labels: datas.map((i) => i.name)
    };
    return this.processedGamesCountDatas;
  }

  gamesGenreDataHandler(datas: IGamesGenres[]) {
    this.processedGamesGenresDatas = {
      dataset: [{
        data: datas.map((i) => i.games_count),
        label: 'Total games',
        backgroundColor: datas.map((i) => this.randomRGBa('0.7')),
        borderColor: datas.map((i) => this.randomRGB())
      }],
      labels: datas.map((i) => i.name)
    };
    return this.processedGamesGenresDatas;
  }

  annualEarningsDataHandler(datas: IFinancial) {
    this.preProcessedAnnualEarningsDatas =  {
      fiscalDateEnding: datas.annualEarnings.flatMap((i) => i.fiscalDateEnding),
      reportedEPS: datas.annualEarnings.flatMap((i) => i.reportedEPS)
    }
    this.processedAnnualEarningsDatas = {
      dataset: [{
        data: this.preProcessedAnnualEarningsDatas.reportedEPS,
        label: '',
        backgroundColor: this.randomRGB()
      }],
      labels: this.preProcessedAnnualEarningsDatas.fiscalDateEnding
    }
    return this.processedAnnualEarningsDatas
  }

  quarterlyEarningsDataHandler(datas: IFinancial) {
    this.preProcessedQuarterlyEarningsDatas = {
      fiscalDateEnding: datas.quarterlyEarnings.flatMap((i) => i.fiscalDateEnding),
      reportedDate: datas.quarterlyEarnings.flatMap((i) => i.reportedDate),
      reportedEPS: datas.quarterlyEarnings.flatMap((i) => i.reportedEPS),
      estimatedEPS: datas.quarterlyEarnings.flatMap((i) => i.estimatedEPS),
      surprise: datas.quarterlyEarnings.flatMap((i) => i.surprise),
      surprisePercentage: datas.quarterlyEarnings.flatMap((i) => i.surprisePercentage),
    }
    this.processedQuarterlyEarningsDatas = {
      dataset: [{
        data: this.preProcessedQuarterlyEarningsDatas.reportedEPS,
        label: 'Reported EPS',
        backgroundColor: this.randomRGB(),
        borderColor: this.randomRGB(),
        fill: true,
      },
        {
          data: this.preProcessedQuarterlyEarningsDatas.estimatedEPS,
          label: 'Estimated EPS',
          backgroundColor: this.randomRGB(),
          borderColor: this.randomRGB(),
          fill: true,
        }],
      labels: this.preProcessedQuarterlyEarningsDatas.fiscalDateEnding
    }
    return this.processedQuarterlyEarningsDatas;
  }
}

export interface IFinancial {
  annualEarnings: IAEarnings[],
  quarterlyEarnings: IQEarnings[]
}

export interface IAEarnings {
  fiscalDateEnding: string[],
  reportedEPS: number[]
}

export interface IQEarnings {
  fiscalDateEnding: string[],
  reportedDate: string[],
  reportedEPS: number[],
  estimatedEPS: number[],
  surprise: string[],
  surprisePercentage: string[]
}

export interface IDataLabelColors {
  data: number[],
  label: string | string[],
  backgroundColor?: string | string[],
  borderColor?: string | string[],
  fill?: boolean
}

export interface Idataset {
  dataset: IDataLabelColors[],
  labels: string[] | string
}

export interface IDeaths {
  Country: string,
  TotalDeaths: number
}

export interface IPercent {
  Country: string,
  PercentageOfDeath: number
}
