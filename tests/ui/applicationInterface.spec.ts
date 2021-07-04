import { expect } from 'chai';
import { browser, ElementFinder } from 'protractor';
import { Calculator } from '../../pageObjects/calculator';
import { LogicalOperator } from '../../support/enums';

describe('Calculator Launch', function () {
  let calculator: Calculator;
  before(function () {
    calculator = new Calculator();
  });
  it('should have a title', async function () {
    expect(await browser.getTitle()).to.equal('Simple Calculator');
  });
  it('should have the left number field displayed', async function () {
    expect(await calculator.leftNumber.isDisplayed()).to.equal(true);
  });
  it('should have the right number field displayed', async function () {
    expect(await calculator.rightNumber.isDisplayed()).to.equal(true);
  });
  it('should have the result field displayed', async function () {
    expect(await calculator.result.isDisplayed()).to.equal(true);
  });
  it('should display the calculation submit button', async function () {
    expect(await calculator.submitButton.isDisplayed()).to.equal(true);
  });
  it('should have the mathematical logical operators present in the option selector', async function () {
    const allElementsInSelector: ElementFinder[] = await calculator.operatorSelector.$$('option');
    for (let i = 0; i < allElementsInSelector.length; i++) {
      const elementText = await allElementsInSelector[i].getText();
      expect(LogicalOperator[elementText], `Element ${elementText} not present`).to.not.equal(undefined);
    }
  });
});