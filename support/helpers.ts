import { until, browser, WebElement, WebElementPromise } from 'protractor';
import { Condition } from 'selenium-webdriver';

export class Helpers {

  async waitForCondition<Type>(condition: Function): Promise<Type> {
    return await browser.wait(condition, 15000, 'Element value not present');
  }
}