
// List of some very interesting anagrams
// =====================================
//
//	A decimal point = I m a dot in place
//	Astronomer = Moon starer
//	Conversation = Voices rant on
//	Debit card = Bad credit
//	Desperation = A rope ends it
//	Dormitory = Dirty room
//	Election results = Lies lets recount
//	Eleven plus two = Twelve plus one
//	Fir cones = Conifers
//	Halleys Comet = Shall yet come
//	Lake Huron = A hunk role
//	Lake Malawi = Im all awake
//	Lake Michigan = Im a leach king
//	Lake Victoria = A trivial coke
//	Lake Winnipeg = Wipe angel ink
//	Mother in law = Woman Hitler
//	Payment received = Every cent paid me
//	Punishment = Nine Thumps
//	Salt lake city = catalyst like
//	School master = The classroom
//	Slot machines = Cash lost in em
//	Snooze alarms = Alas No more Zs
//	The Environment = One tenth vermin
//	The Hurricanes = These churn air
//	The Morse code = Here come dots
//	The earthquakes = That queer shake
//	The eyes = They see
//	The public art galleries = Large picture halls I bet

/**
 *
 * @param list  is an Array containg the words to be searched for anagrams
 * @param listCache is an Object and is optional, that contians a hash map of anagrams
 * @param prerender is a bool that determins if the suppied list should be
 * prerender to listCache which will speed up the search
 *
 **/

var Anagrammy = function (list, listCache, prerender) {
  this.list = list;
  this.listCache = listCache || {};
  this.result = [];
  if (prerender) this.prerender();
};

// Recalculate list length
Anagrammy.prototype.getLen = function () {
  return this.list.length;
};

/**
 * @param str is a string
 * @return string with characters sorted alphabeticallyi
 *
 **/

Anagrammy.sortStr = function (str) {
  return str.split('').sort().join('');
};

/**
 * @param wordA is a string
 * @param wordB is a string
 * @return bool  if A and B is a anagramm
 *
 **/

Anagrammy.isAnagram = function (wordA, wordB) {
  return Anagrammy.sortStr(wordA) === Anagrammy.sortStr(wordB);
};

/**
 *
 * @param targetWord is a string, a word to search for the associated anagrams
 * @param resultCallback is function as a callback to dispatch the anagram matches
 *
 **/

Anagrammy.prototype.searchForAnagram = function (targetWord, resultCallback) {
  this.result = [];
  if (!targetWord) return;

  // Checkout my fast for loop with decrement optimization
  // there is only one teminating check which makes it upto 50% faster than
  // your standard for loops

  for (var i = this.getLen(); i--;) {
    var currentWord = this.list[i];
    if (Anagrammy.isAnagram(targetWord, currentWord)) {
      if (typeof resultCallback === 'function') {
        resultCallback(currentWord);
      };
      var key = Anagrammy.sortStr(currentWord);
      if (!this.listCache[key]) this.listCache[key] = [];
      this.listCache[key].push(currentWord);
      this.list.splice(i, 1);
    }
  }
};

// here we are converting the supplied list to an
// lovely hashmap...
// prerender is quadratic at the moment, so not suitable for large list
// however if we are supplied with an hashmap in the format of
// listCache where the key is an alphabetically sorted word comprises of
// the letters contained within the anagrams them we would get constant time.

Anagrammy.prototype.prerender = function () {
  var self = this;
  setTimeout(function () {
    for (var i = self.getLen(); i--;) {
      self.searchForAnagram(self.list[i]);
    }
  }, 0);
};

/**
 *
 * @param inputWord
 * @return array containing matches or not found message
 *
 **/

Anagrammy.prototype.find = function (inputWord) {
  var key = Anagrammy.sortStr(inputWord);
  var self = this;

  if (this.listCache[key]) {
    return this.listCache[key];
  } else {
    this.searchForAnagram(inputWord, function searchCallback (item) {
      self.result.push(item);
    });
    if (this.result.length > 0) {
      return this.result;
    } else {
      return ['No can\'t find any anagrams.'];
    }
  }
};

// Hack to make Anagrammy test able
// using `node Anagrammy-test.js` in the root dir

if (typeof module !== 'undefined') {
  module.exports = Anagrammy;
}
