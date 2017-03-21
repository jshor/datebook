// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.

import 'angular';
import 'angular-mocks/angular-mocks';
import 'chai';

window.expect = chai.expect;

const context = require.context('./src', true, /_test\.js$/);

context.keys().forEach(context);