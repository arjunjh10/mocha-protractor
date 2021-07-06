import { browser, Config, Runner } from 'protractor';
import * as makeDir from 'make-dir';
import { hook } from '../support/hooks';
const addContext = require('mochawesome/addContext');
const utils = require('../support/utils');

export const config: Config = {
  framework: 'mocha',
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  SELENIUM_PROMISE_MANAGER: false,
  specs: ['../../tests/ui/*.ts'],

  onPrepare: async () => {
    const path = 'mochawesome-report/assets/';
    await makeDir(path);
    browser.waitForAngularEnabled(false);
    browser.manage().window().maximize();
    browser.get('https://calculator-web.azurewebsites.net/');
  },
  onComplete: async () => {
    await browser.quit();
  },
  mochaOpts: {
    compiler: 'ts:ts-node/register',
    timeout: 20000,
    reporter: 'mochawesome',
    ui: 'bdd',
    extension: ['js', 'cjs', 'mjs', 'ts']
  },
  capabilities: {
    'browserName': 'chrome'
  },
  plugins: [{
    name: 'Attach Screenshots to the report',
    inline: {
      async setup() {
        hook('afterEach', async function () {
          if (this.currentTest.state === 'failed') {
            const title = this.currentTest.title.replace(/\s/g, '_');
            const screenshotFileName = `${title}_failed.png`;
            // Storing the screenshot to the folder and the html report
            const screenshotBuffer = await browser.takeScreenshot();
            await utils.saveScreenshot(screenshotBuffer, screenshotFileName);
            addContext(this, 'assets/' + screenshotFileName);
          }
        });
      },
    },  
  }],

  beforeLaunch: () => {
    require('ts-node').register({
      project: './tsconfig.json'
    });
  },
  directConnect: true
};
