import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {IFinancial} from "./data-handling.service";

@Injectable({
  providedIn: 'root'
})
export class PopestiapiService {


  constructor(private http: HttpClient) {
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

    getAllGenres() {
    return this.http.get<IGenreRequest>(`${environment.rawg_url}/genres?key=${environment.rawg_apiKey}`)
    }

    getAnnualEarnings(symbol: string) {
    return this.http.get<IFinancial>(`https://www.alphavantage.co/query?function=EARNINGS&symbol=${symbol}&apikey=${environment.alpha_apiKey}`)
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

export interface IGenreRequest {
  count: number,
  results: IGamesGenres[]
}

export interface IGamesGenres {
  id: number,
  name: string,
  slug: string,
  games: IGames[],
  games_count: number,
  image_background: string,
}
