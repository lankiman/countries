export interface ICountries {
  flags: {
    png: string;
  };
  name: {
    common: string;
    nativeName: {};
  };
  region: string;
  capital: string;
  population: number;
  subregion: string;
  languages: {};

  tld: string;
  borders: [];
  cca3: string;
  currencies: {};
}
