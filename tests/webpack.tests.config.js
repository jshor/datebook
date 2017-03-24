import 'angular';
import 'angular-mocks/angular-mocks';
import 'chai';

window.expect = chai.expect;

const context = require.context('./src', true, /_test\.js$/);

context.keys().forEach(context);