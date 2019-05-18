'use strict';

var assert = require('assert');
var testit = require('testit');
var isExpression = require('./');

function passes(src, options) {
  testit(JSON.stringify(src, options), function () {
    options = options || {};
    assert(isExpression(src, options));
  });
}

testit('passes', function () {
  passes('myVar');
  passes('["an", "array", "\'s"].indexOf("index")');
  passes('\npublic');
  passes('abc // my comment', {lineComment: true});
  passes('() => a');
  passes('function (a = "default") {"use strict";}', {ecmaVersion: 6});
});

function error(src, line, col, options) {
  testit(JSON.stringify(src), function () {
    options = options || {};
    assert(!isExpression(src, options));
    options.throw = true;
    assert.throws(function () {
      isExpression(src, options);
    }, function (err) {
      assert.equal(err.loc.line, line);
      assert.equal(err.loc.column, col);
      assert(err.message);
      return true;
    });
  });
}

testit('fails', function () {
  error('', 1, 0);
  error('var', 1, 0);
  error('weird error', 1, 6);
  error('asdf}', 1, 4);
  error('\npublic', 2, 0, {strict: true});
  error('abc // my comment', 1, 4);
  error('() => a', 1, 1, {ecmaVersion: 5});
  error('function (a = "default") {"use strict";}', 1, 26);
});
