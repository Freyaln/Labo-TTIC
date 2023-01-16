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

    getFromDayOne(country: string) {
      return this.http.get<GeneralDatas[]>(`https://api.covid19api.com/dayone/country/${country}`)
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
