import { AxiosInstance } from 'axios';

export abstract class Category {
  protected api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }
}
