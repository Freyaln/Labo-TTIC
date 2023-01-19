import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PopestiapiService {

  constructor(private http: HttpClient) { }

    getAllCountries() {
    return this.http.get<Countries[]>('https://api.covid19api.com/countries')
    }

    getAllFromCountry(country: string, dateStart: string, dateEnd: string) {
      return this.http.get<GeneralDatas[]>(`https://api.covid19api.com/country/${country}?from=${dateStart}&to=${dateEnd}`)
    }

    getLiveCasesByCountry(country: string, date: string) {
    return this.http.get<GeneralDatas[]>(`https://api.covid19api.com/live/country/${country}/status/confirmed/date/${date}`)
    }

    getAllDatas() {
      return this.http.get<SummaryDatas>(`https://api.covid19api.com/summary`)
    }
}

export interface GeneralDatas {
  Active: number,
  City: string,
  CityCode: string,
  Confirmed: number,
  Country: string,
  CountryCode: string,
  Date: Date,
  Deaths: number,
  ID: string,
  Lat: string,
  Lon: string,
  Province: string,
  Recovered: number
}

export interface Countries {
  Country: string
}

export interface SummaryGlobal {
  NewConfirmed: number,
  TotalConfirmed: number,
  NewDeaths: number,
  TotalDeaths: number,
  NewRecovered: number,
  TotalRecovered: number,
  Date: string
}

export interface SummaryCountry {
  Country: string,
  CountryCode: string,
  Slug: string,
  NewConfirmed: number,
  TotalConfirmed: number,
  NewDeaths: number,
  TotalDeaths: number,
  NewRecovered: number,
  TotalRecovered: number,
  Date: string
}

export interface SummaryDatas {
  Global: SummaryGlobal[],
  Countries: SummaryCountry[]
}
