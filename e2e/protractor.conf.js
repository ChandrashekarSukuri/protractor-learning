// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  allScriptsTimeout: 11000,
  specs: ["specs/add-users-pageobj.spec.ts"],//super-calculator.spec.ts //average.spec.ts
  // page-object-example.spec.ts //jasmine.spec.ts //add-users-pageobj.spec.ts
  capabilities: {
    browserName: 'chrome'
  },
  SELENIUM_PROMISE_MANAGER: false,
  // directConnect: true,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
onPrepare() {
  require('ts-node').register({
    project: require('path').join(__dirname, './tsconfig.json')
  });
  jasmine.getEnv().addReporter(new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.PRETTY
    }
  }));
}
};