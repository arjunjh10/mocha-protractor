import { browser, Config } from 'protractor';

export const config: Config = {
  framework: 'mocha',
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  SELENIUM_PROMISE_MANAGER: false,
  specs: ['../../tests/*.ts'],

  onPrepare: () => {
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
    reporterOptions: {
      reportDir: 'results'
    },
    ui: 'bdd'
  },
  capabilities: {
    'browserName': 'chrome'
  },
  beforeLaunch: () => {
    require('ts-node').register({
      project: './tsconfig.json'
    });
  },
  directConnect: true
};
