import axios, { AxiosInstance, CanceledError } from "axios";

export class ApiService {
  protected readonly _apiKey: string = import.meta.env.VITE_TMDB_API_KEY || "";
  protected readonly _apiToken: string =
    import.meta.env.VITE_TMDB_API_TOKEN || "";
  protected readonly _url: string = "https://api.themoviedb.org/3";

  private _api: ReturnType<typeof axios.create> = axios.create({
    baseURL: this._url,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${this._apiToken}`
    }
  });

  constructor() {
    if (!this._apiToken)
      throw new Error(
        "API token is not defined. Please set VITE_TMDB_API_TOKEN."
      );
    this._api.interceptors.response.use(
      (response) => response ?? { data: {} },
      (error) => {
        if (error instanceof CanceledError) {
          console.log("Request was canceled.");
          return {};
        }
        if (error.response) {
          console.error("API Error:", error.response.data);
          return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
      }
    );
  }

  protected get api(): AxiosInstance {
    return this._api;
  }
}
