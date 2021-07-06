import { expect } from 'chai';
import { browser, ElementFinder } from 'protractor';
import { Calculator } from '../../pageObjects/calculator';

describe('Addition', function () {
  let calculator: Calculator;
  before(function () {
    calculator = new Calculator();
  });
  const tests = [
    { description: 'Add two positive integers', args: [1, 2], expected: 3 },
    { description: 'Add two negative integers', args: [-1, -2], expected: -3 },
    { description: 'Add a positive and a negative integer', args: [5, -8], expected: -3 },
    { description: 'Add decimal numbers', args: [1.1, 2.3], expected: 3.4 },
  ];

  beforeEach(async function () {
    await browser.refresh();
  });

  tests.forEach(test => {
    it(test.description, async function () {
      await calculator.leftNumber.sendKeys(test.args[0]);
      await calculator.rightNumber.sendKeys(test.args[1]);
      const plusOperator: ElementFinder = await calculator.getOperatorSelectionForCalculator('+');
      await plusOperator.click();
      const result = await calculator.submitCalculationAndReturnResult();
      expect(+result).to.equal(test.expected);
    });
  });
});