  // Karma configuration
// Generated on Mon Apr 01 2019 14:46:57 GMT+0530 (India Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      "node_modules/angular/angular.js",
      "node_modules/angular-mocks/angular-mocks.js",
      "node_modules/angular-route/angular-route.js",
      "app/index.js",
      "app/factory/mailFactory.js",
      'app/templates/customDirectives.js',
      "app/mailBox/mailBoxController.js",
      "app/mailBoxInfo/mailBoxInfoController.js",
      "app/mailEditor/mailEditorController.js",
      "app/routingConfig.js",
      "test/unitTesting/mailFactory.spec.js",
      'test/unitTesting/customDirectives.spec.js',
      "test/unitTesting/mailBoxController.spec.js",
      "test/unitTesting/mailBoxInfoController.spec.js",
      "test/unitTesting/mailEditorController.spec.js",
      "test/unitTesting/routingConfig.spec.js"

    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/**/*.js': ['coverage'],
      'app/*.js': ['coverage']
    },

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','junit'],

    junitReporter: {
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: false, // add browser name to report and classes names
      outputFile : 'unit.xml'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
