var loopback = require('loopback');
var helpers = require('../');
var assert = require('assert');

describe('helpers', function () {
  var testApp = loopback();
  var db = testApp.dataSource('db', {connector: loopback.Memory});
  var testModel = testApp.model('xxx-test-model', {dataSource: 'db'});

  testApp.use(loopback.rest());
  helpers.beforeEach.withApp(testApp);

  describe('helpers.it', function() {
    ['shouldBeAllowed',
     'shouldBeDenied']
    .forEach(function(func) {
      it('should have a method named ' + func, function () {
        assert.equal(typeof helpers.it[func], 'function');
      });
    });
  });

  describe('helpers.describe', function() {
    ['staticMethod',
     'whenLoggedInAsUser',
     'whenCalledAnonymously']
    .forEach(function(func) {
      it('should have a method named ' + func, function () {
        assert.equal(typeof helpers.describe[func], 'function');
      });
    });
  });

  describe('helpers.beforeEach', function() {
    ['withArgs',
     'givenModel',
     'givenUser']
    .forEach(function(func) {
      it('should have a helper method named ' + func, function () {
        assert.equal(typeof helpers.beforeEach[func], 'function');
      });
    });
  });

  describe('helpers.beforeEach.givenModel', function() {
    helpers.beforeEach.givenModel('xxx-test-model');
    it('should have an xxx-test-model property', function () {
      assert(this['xxx-test-model']);
      assert(this['xxx-test-model'].id);
    });
  });

  describe('whenCalledRemotely', function() {
    helpers.describe.staticMethod('create', function() {
      helpers.beforeEach.withArgs({foo: 'bar'});
      helpers.describe.whenCalledRemotely('POST', '/xxx-test-models', function() {
        it('should call the method over rest', function () {
          assert.equal(this.res.statusCode, 200);
        });
      });
    });
  });
});
