import axios from "axios";
import { ServiceConfig } from "./ServiceConfig";

export interface ParamsType {
  page: number;
  language: string;
}

export class Service<T> extends ServiceConfig {
  private readonly _path: string;
  private _params: ParamsType = {
    page: 1,
    language: "en-US"
  };

  constructor(path: string) {
    super();
    this._path = path;
  }

  fetchEntities = async ({
    params = {},
    signal
  }: {
    params?: Partial<ParamsType>;
    signal: AbortSignal;
  }): Promise<T[]> => {
    try {
      const response = await this._api.get<T[]>(this._path, {
        params: { ...this._params, ...params },
        signal
      });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.warn("Request was cancelled: ", error.message);
        return [];
      } else {
        console.error(error);
        throw new Error(`Error fetching data:${(error as Error).message}`);
      }
    }
  };
}
