
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

export interface IDevNameAndId {
  name: string,
  id: string
}


export interface IGamesByDev {
  dev: IDevNameAndId[],
  name: string,
  platforms: IIdNameSlug[],
  rating: number

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

interface IGamesDataStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
}

interface IGamesDataEsrb {
  id: number;
  name: string;
  slug: string;
  name_en: string;
  name_ru: string;
}


interface IGamesDataRating {
  id: number,
  title: string,
  percent: number,
  count: number
}

interface IGamesDataScreenshots {
  id: number,
  image: string
}

interface IIdNameSlug {
  id: number,
  name: string,
  slug: string
}

interface IGamesDataTags {
  games_count: number,
  id: number,
  image_background: string,
  language: string,
  name: string,
  slug: string
}

export interface IGamesDataResult {
  added: number,
  added_by_status: IGamesDataStatus[],
  background_image: string,
  clip: any,
  dominant_color: string,
  esrb_rating: IGamesDataEsrb[],
  genres: IIdNameSlug[],
  id: number,
  metacritic: number,
  name: string,
  parent_platforms: IIdNameSlug[],
  platforms: IIdNameSlug[],
  playtime: number,
  rating: number,
  rating_top: number,
  ratings: IGamesDataRating[],
  ratings_count: number,
  released: string,
  reviews_count: number,
  reviews_text_count: number,
  saturated_color: string,
  score: any,
  short_screenshots: IGamesDataScreenshots[],
  slug: string,
  stores: IIdNameSlug[],
  suggestions_count: number,
  tags: IGamesDataTags[],
  tba: boolean,
  updated: string,
  user_game: any,
}

export interface IGamesData {
  count: number,
  next: string,
  previous: string,
  results: IGamesDataResult[]
}

export interface IButtonPlatform {
  label: string,
  id: string
}
