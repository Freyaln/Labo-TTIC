import { Injectable } from '@angular/core';
import {GeneralDatas, ICompanies, ICompaniesResult, PopestiapiService, SummaryDatas} from "./popestiapi.service";
import {environment} from "../../environments/environment";
import {ListInterface} from "../components/atoms/link-list/link-list.component";

@Injectable({
  providedIn: 'root'
})
export class DataHandlingService {


  // @ts-ignore
  processedDatas: Idataset;
  // @ts-ignore
  processedDeathDatas: Idataset;
  // @ts-ignore
  processedConfirmedDatas: Idataset;
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

  countryDataHandler(datas: GeneralDatas[]) {
    this.processedDatas = {
      dataset: [{
        data: datas.map((i) => i.Deaths),
        label: `Deaths from ${datas[0].Country}`,
        backgroundColor: 'rgb(168,2,2)',
        borderColor: 'rgb(194,77,77)'
      },
        {
          data: datas.map((i) => i.Confirmed),
          label: `Confirmed Cases from ${datas[0].Country}`,
          backgroundColor: 'rgb(2,48,173)',
          borderColor: 'rgb(35,69,168)'
        },
        {
          data: datas.map((i) => i.Confirmed),
          label: `Confirmed from ${datas[0].Country}`,
          backgroundColor: 'rgb(211,202,9)',
          borderColor: 'rgb(198,218,55)'
        }
      ],
      labels: datas.map((i) => i.Date.toString().slice(0, -10))
    }
    return this.processedDatas;
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

  confirmedDataHandler(datas: SummaryDatas) {
    const filteredDatas = datas.Countries.filter(elem => elem.TotalDeaths >= 100000);
    const preDatas = filteredDatas.sort((a,b) => b.TotalConfirmed - a.TotalConfirmed)
    this.processedConfirmedDatas = {
      dataset: [{
        data: preDatas.map((i) => i.TotalConfirmed),
        label: "Confirmed cases in top 100k countries",
        backgroundColor: preDatas.map((i) => this.randomRGB())
      }],
      labels: preDatas.map((i) => i.Country)
    }
    return this.processedConfirmedDatas;
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

  deathsDataHandler(datas: SummaryDatas) {
    // optimized way
    const filteredDatas = datas.Countries.filter(elem => elem.TotalDeaths >= 100000);
    const preDatas = filteredDatas.sort((a,b) => b.TotalDeaths - a.TotalDeaths)
    this.processedDeathDatas = {
      dataset: [{
        data: preDatas.map((i) => i.TotalDeaths),
        label: "Countries that had more than 100k deaths",
        backgroundColor: preDatas.map((i) => this.randomRGB())
      }],
      labels: preDatas.map((i) => i.Country)
    }
    return this.processedDeathDatas;

    // Un-optimized way
    // datas.Countries.forEach((elem, index) => {
    //   if (elem.TotalDeaths >= 100000) {
    //     this.preProcessDeath[index] = {
    //       Country: elem.Country,
    //       TotalDeaths: elem.TotalDeaths
    //     }
    //   }
    // })
    // this.processedDeathDatas = {
    //   dataset: [{
    //     data: this.preProcessDeath
    //       .filter(i => i.TotalDeaths !== null && i.TotalDeaths !== undefined)
    //       .map((i) => i.TotalDeaths),
    //     label: 'Total deaths in country'
    //   }],
    //   labels: this.preProcessDeath
    //     .filter(i => i.Country !== null && i.Country !== undefined)
    //     .map((i) => i.Country)
    // }
    // return this.processedDeathDatas;
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
