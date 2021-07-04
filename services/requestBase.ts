import axios, { AxiosInstance, AxiosResponse } from 'axios';
export class Base {
    private axiosInstance: AxiosInstance;
    private static baseUrl = 'https://calculator-api.azurewebsites.net/api/';
    constructor() {
      this.axiosInstance = axios.create({
        baseURL: Base.baseUrl,
        timeout: 1000,
        headers: {
          'x-functions-key': 'cYWOrJhggJO8/CHx52TfmD8AH5RdGEjSIBjHhuiHb5qnFV0jzDyngQ=='
        }
      });
    }

    get instance(): AxiosInstance {
      return this.axiosInstance;
    }

    async postRequest(uri: string, data: any): Promise<AxiosResponse<any>> {
      return await this.instance.post(uri, data);
    }
}