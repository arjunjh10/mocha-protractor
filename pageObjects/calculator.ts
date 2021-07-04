import { $, $$, by, element, ElementFinder, browser, WebElement, ExpectedConditions, until } from 'protractor';
import { LogicalOperator } from '../support/enums';
import { Helpers } from '../support/helpers';
let helpers: Helpers;
helpers = new Helpers();

export class Calculator {
    leftNumber: ElementFinder = $('#leftNumber');
    rightNumber: ElementFinder = $('#rightNumber');
    operatorSelector: ElementFinder = $('#operator');
    result: ElementFinder = element(by.css('.result'));
    submitButton: ElementFinder = element(by.buttonText('Calculate'));

    async submitCalculationAndReturnResult(): Promise<string> {
      const iFrameElement: ElementFinder = element(by.tagName('iframe'));
      await browser.switchTo().frame(await iFrameElement.getWebElement());
      await this.submitButton.click();
      await browser.switchTo().defaultContent();

      let resultField: WebElement = await this.result.getWebElement();


      const result: string = await helpers.waitForCondition(async () => {
        const attr: string = await resultField.getAttribute('value');

        if (attr !== '') {
          return attr;
        }
      });
      return result;
    }

    async getOperatorSelectionForCalculator(operator: string): Promise<ElementFinder> {
      const allElementsInSelector: ElementFinder[] = await this.operatorSelector.$$('option');
      let operatorIndex: number;
      for (let i = 0; i < allElementsInSelector.length; i++) {
        if (LogicalOperator[await allElementsInSelector[i].getText()] === LogicalOperator[operator])
        {
          operatorIndex = i;
        }
      }

      return allElementsInSelector[operatorIndex];
    }
}