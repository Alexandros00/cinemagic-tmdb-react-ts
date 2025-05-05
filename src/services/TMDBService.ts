import axios from "axios";
import { ApiService } from "./ApiService";
import { Params } from "../models/Params";

export class TMDBService<T> extends ApiService {
  private readonly _path: string;
  private _params: Params = {
    page: 1,
    language: "en-US"
  };

  constructor(path: string, params?: Partial<Params>) {
    super();
    this._path = path;
    if (params) {
      this._params = { ...this._params, ...params };
    }
  }

  fetchEntities = async ({
    params = {},
    signal
  }: {
    params?: Partial<Params>;
    signal: AbortSignal;
  }): Promise<T | null> => {
    try {
      const response = await this.api.get<T>(this._path, {
        params: { ...this._params, ...params },
        signal
      });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.warn("Request was cancelled: ", error.message);
        return null;
      } else {
        console.error(error);
        throw new Error(`Error fetching data:${(error as Error).message}`);
      }
    }
  };
}

const serviceCache = new Map<string, TMDBService<unknown>>();

export const getTMDBService = <T>(path: string): TMDBService<T> => {
  if (!serviceCache.has(path)) {
    serviceCache.set(path, new TMDBService<T>(path));
  }
  return serviceCache.get(path) as TMDBService<T>;
};
