// Karma configuration
<<<<<<< HEAD
// Generated on Fri Nov 13 2015 10:21:53 GMT-0500 (EST)
=======
// Generated on Mon Nov 16 2015 11:46:42 GMT-0500 (EST)
>>>>>>> 9ddc745... adds karma conf

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


<<<<<<< HEAD
=======
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

  
>>>>>>> ae4bf9b... updates testing method in karma conf, use chrome/firefox/phantomjs travis launchers"
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

<<<<<<< HEAD
    plugins : [
      'karma-browserify',
      'karma-jasmine',
      'karma-phantomjs-launcher'
    ],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'addtocalendar.js',
      'spec/*.js'
=======

    // list of files / patterns to load in the browser
    files: [
      'test/**/*.spec.js',
      'test/**/*.spec.js'
>>>>>>> 9ddc745... adds karma conf
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


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
<<<<<<< HEAD
<<<<<<< HEAD
    browsers: ['PhantomJS'],
=======
    browsers: ['Chrome'],
>>>>>>> 9ddc745... adds karma conf
=======
    browsers: [
      'Chrome',
      'Firefox',
      'PhantomJS'
    ],
>>>>>>> ae4bf9b... updates testing method in karma conf, use chrome/firefox/phantomjs travis launchers"


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
<<<<<<< HEAD
  })
=======
  };


  if (process.env.TRAVIS) {
    // if testing env is Travis, use special Travis testing browsers
    configuration.browsers = [
      'firefoxTravisCi'
    ];
  }

  config.set(configuration);

>>>>>>> ae4bf9b... updates testing method in karma conf, use chrome/firefox/phantomjs travis launchers"
}
