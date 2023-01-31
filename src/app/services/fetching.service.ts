import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ICompanies, IFinancial, IGamesData, IGenreRequest } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FetchingService {
  constructor(private http: HttpClient) {}

  getAllCompanies() {
    return this.http.get<ICompanies>(
      `${environment.rawg_url}/developers?key=${environment.rawg_apiKey}&page_size=15`
    );
  }

  getPage(link: string) {
    return this.http.get<ICompanies>(`${link}`);
  }

  getDetails(link: string) {
    return this.http.get(`${link}`);
  }

  getAllGenres() {
    return this.http.get<IGenreRequest>(
      `${environment.rawg_url}/genres?key=${environment.rawg_apiKey}`
    );
  }

  getGamesFromCompany(id: string) {
    return this.http.get<IGamesData>(
      `${environment.rawg_url}/games?key=${environment.rawg_apiKey}&developers=${id}&page_size=40`
    );
  }

  getPageFromGames(link: string) {
    return this.http.get<IGamesData>(`${link}`);
  }

  getByPlatform(id: string, platform: string) {
    return this.http.get<IGamesData>(
      `${environment.rawg_url}/games?key=${environment.rawg_apiKey}&developers=${id}&platforms=${platform}&page_size=40`
    );
  }

  getAnnualEarnings(symbol: string) {
    return this.http.get<IFinancial>(
      `https://www.alphavantage.co/query?function=EARNINGS&symbol=${symbol}&apikey=${environment.alpha_apiKey}`
    );
  }
}
