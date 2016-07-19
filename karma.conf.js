// Karma configuration
// Generated on Mon Nov 16 2015 11:46:42 GMT-0500 (EST)

module.exports = function(config) {

  var configuration = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // custom browsers launchers (mainly for Travis)
    customLaunchers: {
      chromeTravisCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      },
      firefoxTravisCi: {
        base: 'Firefox',
        flags: ['--no-sandbox']
      }
    },

    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-file-saver/dist/angular-file-saver.bundle.js',
      'node_modules/moment/moment.js',
      'lib/*.js',
      'lib/**/*.js',
      'addtocalendar/*.js',
      'test/fixtures/*.js',
      'test/lib/*.js',
      'test/*.spec.js'
    ],

    reporters: ['progress', 'coverage', 'coveralls'],


    preprocessors: {
      'lib/*.js': ['coverage'],
      'addtocalendar/*.js': ['coverage'],
    },

    coverageReporter: {
      type: 'lcov', // lcov or lcovonly are required for generating lcov.info files
      dir: 'coverage/'
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
    browsers: [
      'Chrome',
      'Firefox',
      'PhantomJS'
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  };


  if (process.env.TRAVIS) {
    // if testing env is Travis, use special Travis-specific browsers
    configuration.browsers = [
      'firefoxTravisCi',
      'chromeTravisCi'
    ];
  }

  config.set(configuration);
}