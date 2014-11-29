"use strict";
Object.defineProperties(exports, {
  Apitance: {get: function() {
      return Apitance;
    }},
  __esModule: {value: true}
});
var __moduleName = "../src/index.js";
require('./traceur-runtime');
var Cucumber = require('cucumber').Cucumber;
var Apitance = function Apitance() {
  this.cucumber = new Cucumber;
};
($traceurRuntime.createClass)(Apitance, {}, {});
