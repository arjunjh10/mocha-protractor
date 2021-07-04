import { expect } from 'chai';
import { browser, ElementFinder } from 'protractor';
import { Calculator } from '../../pageObjects/calculator';

describe('Division', function () {
  let calculator: Calculator;
  before(function () {
    calculator = new Calculator();
  });
  const tests = [
    { description: 'Divide two positive integers', args: [1, 2], expected: 0.5 },
    { description: 'Divide two negative integers', args: [-1, -2], expected: 0.5 },
    { description: 'Divide a positive and a negative integer', args: [5, -8], expected: -0.625 },
    { description: 'Divide a number by 0', args: [5, 0], expected: undefined },
    { description: 'Divide 0 number by an integer', args: [0, 5], expected: 0 },
    { description: 'Divide decimal numbers', args: [1.5, 2.5], expected: 0.6 }
  ];

  beforeEach(async function () {
    await browser.refresh();
  });

  tests.forEach(test => {
    it(test.description, async function () {
      await calculator.leftNumber.sendKeys(test.args[0]);
      await calculator.rightNumber.sendKeys(test.args[1]);
      const divisionOperator: ElementFinder = await calculator.getOperatorSelectionForCalculator('/');
      await divisionOperator.click();
      const result = await calculator.submitCalculationAndReturnResult();
      expect(+result).to.equal(test.expected);
    });
  });
});