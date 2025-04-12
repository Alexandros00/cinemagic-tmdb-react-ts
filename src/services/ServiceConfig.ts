import axios from "axios";

export class ServiceConfig {
  protected readonly _apiKey: string = import.meta.env.VITE_TMDB_API_KEY || "";
  protected readonly _apiToken: string =
    import.meta.env.VITE_TMDB_API_TOKEN || "";
  protected readonly _url: string = "https://api.themoviedb.org/3";

  protected _api = axios.create({
    baseURL: this._url,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${this._apiToken}`
    }
  });
}
