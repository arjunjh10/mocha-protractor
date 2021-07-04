/* eslint-disable @typescript-eslint/naming-convention */
import { expect } from 'chai';
import { CalculatorRequest } from '../../contracts/calculatorApi';
import { Calculation } from '../../services/calculation';

describe('Substraction', function () {
  let calculation: Calculation;
  before(function () {
    calculation = new Calculation();
  });
  const tests = [
    { description: 'Subtract two positive integers', args: { left: 1, right: 2 }, expected: -1 },
    { description: 'Subtract two negative integers', args: { left: -1, right: -2 }, expected: 1 },
    { description: 'Subtract a positive and a negative integer', args: { left: 5, right: -8 }, expected: 13 },
    { description: 'Subtract decimal numbers', args: { left: 1.1, right: 2.3 }, expected: -1.2 },
  ];

  tests.forEach(test => {
    it(test.description, async function () {
      const evaluationRequest: CalculatorRequest = {
        LeftNumber: test.args.left,
        Operator: '-',
        RightNumber: test.args.right
      };
      const response = await calculation.evaluate(evaluationRequest);
      expect(response.status).to.equal(200);
      expect(response.data.value).to.equal(test.expected);
    });
  });
});