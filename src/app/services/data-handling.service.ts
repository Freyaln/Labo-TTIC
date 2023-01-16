import { Injectable } from '@angular/core';
import {GeneralDatas, PopestiapiService} from "./popestiapi.service";

@Injectable({
  providedIn: 'root'
})
export class DataHandlingService {


  // @ts-ignore
  processedDatas: Idataset;


  constructor(private _popestiapiService: PopestiapiService) {}

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
          data: datas.map((i) => i.Recovered),
          label: `Recovered from ${datas[0].Country}`,
          backgroundColor: 'rgb(211,202,9)',
          borderColor: 'rgb(198,218,55)'
        }
      ],
      labels: datas.map((i) => i.Date.toString().slice(0, -10))
    }
    return this.processedDatas;
  }
}
export interface IDataLabelColors {
  data: number[],
  label: string,
  backgroundColor: string,
  borderColor: string
}

export interface Idataset {
  dataset: IDataLabelColors[],
  labels: string[] | string
}
