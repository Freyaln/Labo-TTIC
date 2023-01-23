import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PopestiapiService {


  constructor(private http: HttpClient) {
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

    getAllCompanies() {
      return this.http.get<ICompanies>(`${environment.rawg_url}/developers?key=${environment.rawg_apiKey}&page_size=15`)
    }

    getPage(link: string) {
      return this.http.get<ICompanies>(`${link}`)
    }

    getDetails(link: string) {
    return this.http.get(`${link}`)
    }

    getAnnualEarnings(symbol: string) {
    return this.http.get(`https://www.alphavantage.co/query?function=EARNINGS&symbol=${symbol}&apikey=${environment.alpha_apiKey}`)
    }
}

export interface ICompanies {
  count: number,
  next: string | null,
  previous: string | null,
  results: ICompaniesResult[]
}

export interface ICompaniesResult {
  games: IGames[],
  games_count: number,
  id: number,
  image_background: string,
  name: string,
  slug: string
}

export interface IGames {
  added: number,
  id: number,
  name: string,
  slug: string
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
