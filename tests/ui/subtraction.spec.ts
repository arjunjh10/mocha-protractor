import { expect } from 'chai';
import { browser, ElementFinder } from 'protractor';
import { Calculator } from '../../pageObjects/calculator';

describe('Subtraction', function () {
  let calculator: Calculator;

  before(function () {
    calculator = new Calculator();
  });

  const tests = [
    { description: 'Subtract two positive integers', args: [1, 2], expected: -1 },
    { description: 'Subtract two negative integers', args: [-1, -2], expected: 1 },
    { description: 'Subtract a positive and a negative integer', args: [5, -8], expected: 13 },
    { description: 'Subtract decimal numbers', args: [5.3, 4.1], expected: 1.2 }
  ];

  beforeEach(async function () {
    await browser.refresh();
  });

  tests.forEach(test => {
    it(test.description, async function () {
      await calculator.leftNumber.sendKeys(test.args[0]);
      await calculator.rightNumber.sendKeys(test.args[1]);
      const minusOperator: ElementFinder = await calculator.getOperatorSelectionForCalculator('-');
      await minusOperator.click();
      const result = await calculator.submitCalculationAndReturnResult();
      expect(+result).to.equal(test.expected);
    });
  });
});