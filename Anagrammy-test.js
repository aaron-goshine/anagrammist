var Anagrammy = require('./Anagrammy.js');

var testWord = 'rat';
var testList = ['art', 'tar', 'rat', 'start', 'stars', 'fare', 'rafe'];
var testListCache = {};

var instance;

function before () {
  instance = new Anagrammy(testList, testListCache);
}

function after () {
  instance = null;
}

var Units = {
  'isAnagram  should be true': function () {
    return Anagrammy.isAnagram('rat', 'tar') === true;
  },
  'getLen should be 7': function () {
    return instance.getLen() === 7 || instance.getLen();
  },
  'searchForAnagram should be true': function () {
    instance.searchForAnagram('tar', function (item) {
      this.result.push(item);
    }.bind(instance));

    return instance.result.length === 3 || instance.result.length;
  },
  'prerender convert list to hash map': function () {
    instance.prerender();
    return instance.list.length === 0 || instance.list.length;
  },
  'find should match 3 items': function () {
    return instance.find('tar').length === 3 || instance.find('tar').length;
  }
};

function clog (e, message) {
  if (e) {
    console.log('\u001b[31m' + message + '\u001b[0m');
  } else {
    console.log('\u001b[32m' + message + '\u001b[0m');
  }
}

function runtest () {
  for (var u in Units) {
    before();
    var assertion = Units[u]();
    if (assertion === true) {
      clog(false, u + ' : PASS');
    } else {
      clog(true, u + ' : FAIL ' + assertion);
    }
    after();
  }
}

runtest();
