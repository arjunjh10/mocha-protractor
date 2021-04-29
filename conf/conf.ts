import { browser, Config } from "protractor";

export const config: Config = {
    framework: 'mocha',
    seleniumAddress: "http://127.0.0.1:4444/wd/hub",
    SELENIUM_PROMISE_MANAGER: false,
    specs: ['../../tests/*.ts'],

    onPrepare: () => {
        // browser.waitForAngularEnabled(false);
        browser.manage().window().maximize();
    },
    mochaOpts: {
        compiler: "ts:ts-node/register",
        timeout: 10000,
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
}
