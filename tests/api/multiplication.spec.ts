/* eslint-disable @typescript-eslint/naming-convention */
import { expect } from 'chai';
import { CalculatorRequest } from '../../contracts/calculatorApi';
import { Calculation } from '../../services/calculation';

describe('Multiplication', function () {
  let calculation: Calculation;
  before(function () {
    calculation = new Calculation();
  });
  const tests = [
    { description: 'Multiply two positive integers', args: { left: 1, right: 2 }, expected: 2 },
    { description: 'Multiply two negative integers', args: { left: -1, right: -2 }, expected: 2 },
    { description: 'Multiply a positive and a negative integer', args: { left: 5, right: -8 }, expected: -40 },
    { description: 'Multiply decimal numbers', args: { left: 1.1, right: 2.3 }, expected: 2.53 },
  ];

  tests.forEach(test => {
    it(test.description, async function () {
      const evaluationRequest: CalculatorRequest = {
        LeftNumber: test.args.left,
        Operator: '*',
        RightNumber: test.args.right
      };
      const response = await calculation.evaluate(evaluationRequest);
      expect(response.status).to.equal(200);
      expect(response.data.value).to.equal(test.expected);
    });
  });
});