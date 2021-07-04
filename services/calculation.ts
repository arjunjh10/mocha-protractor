import { CalculatorRequest, CalculatorResponse } from '../contracts/calculatorApi';
import { Base } from './requestBase';
import { AxiosResponse } from 'axios';

export class Calculation extends Base {
  constructor() {
    super();
  }
  async evaluate(evaluationRequest: CalculatorRequest): Promise<AxiosResponse<CalculatorResponse>> {
    let evaluation = await this.postRequest('Calculate', evaluationRequest);
    return evaluation;
  }
}