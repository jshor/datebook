module.exports = function karmaConfig (config) {
  config.set({
    frameworks: [
      'jasmine',
      'chai',
      'sinon-chai'
    ],

    reporters: [
      'spec',
      'coverage'
    ],

    files: [
      'node_modules/angular/angular.min.js',
      'tests/webpack.tests.config.js'
    ],

    preprocessors: {
      'tests/webpack.tests.config.js': ['webpack', 'sourcemap']
    },

    browsers: [
      'PhantomJS'
    ],

    singleRun: true,

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'text-summary'},
        {type: 'html'}
      ]
    },

    logLevel: config.LOG_DEBUG,

    webpack: require('./webpack.config'),

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: 'errors-only'
    }
  });
};
