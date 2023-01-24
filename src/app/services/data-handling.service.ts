import { Injectable } from '@angular/core';
import {ICompaniesResult, PopestiapiService} from "./popestiapi.service";

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

  percentageDeathsToConfirmedHandler(deathsDatas: any, confirmedDatas: any) {
    let percentage: IPercent[] = [];
    for (let i = 0; i < deathsDatas.labels.length; i++) {
      let country = deathsDatas.labels[i]
      let confirmedIndex = confirmedDatas.labels.indexOf(country);
      if(confirmedIndex !== -1) {
        let deaths = deathsDatas.dataset[0].data[i];
        let confirmed = confirmedDatas.dataset[0].data[confirmedIndex];
        let percent: number = (deaths/confirmed)*100
        percentage.push({
          Country: country,
          PercentageOfDeath: percent
        })
        this.processedPercentage = {
          dataset: [{
            data: percentage.map((i) => i.PercentageOfDeath),
            label: 'Percentage of deaths to confirmed case in top 100k countries',
            backgroundColor: percentage.map((i) => this.randomRGB())
          }],
          labels: percentage.map((i) => i.Country)
        }
      }
    }
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
    console.log(this.processedAnnualEarningsDatas)
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
        backgroundColor: this.randomRGB()
      },
        {
          data: this.preProcessedQuarterlyEarningsDatas.estimatedEPS,
          label: 'Estimated EPS',
          backgroundColor: this.randomRGB()
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
  borderColor?: string
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
