import { expect } from 'chai';
import { browser, ElementFinder } from 'protractor';
import { Calculator } from '../../pageObjects/calculator';

describe('Multiplication', function () {
  let calculator: Calculator;
  before(function () {
    calculator = new Calculator();
  });
  const tests = [
    { description: 'Multiply two positive integers', args: [1, 2], expected: 2 },
    { description: 'Multiply two negative integers', args: [-1, -2], expected: 2 },
    { description: 'Multiply a positive and a negative integer', args: [5, -8], expected: -40 },
    { description: 'Multiply decimal numbers', args: [1.5, 1.5], expected: 2.25 }
  ];

  beforeEach(async function () {
    await browser.refresh();
  });

  tests.forEach(test => {
    it(test.description, async function () {
      await calculator.leftNumber.sendKeys(test.args[0]);
      await calculator.rightNumber.sendKeys(test.args[1]);
      const multiplicationOperator: ElementFinder = await calculator.getOperatorSelectionForCalculator('*');
      await multiplicationOperator.click();
      const result = await calculator.submitCalculationAndReturnResult();
      expect(+result).to.equal(test.expected);
    });
  });
});