/* eslint-disable @typescript-eslint/naming-convention */
export interface CalculatorRequest {
    LeftNumber: number;
    RightNumber: number;
    Operator: string;
}

export interface CalculatorResponse {
    value: string;
}