import { expect } from "chai";
import { browser } from "protractor";

describe('Protractor Demo App', async function() {
    it('should have a title', async function() {
      await browser.get('https://www.protractortest.org/');
  
      expect(await browser.getTitle()).to.equal('Protractor - end-to-end testing for AngularJS');
    });
  });