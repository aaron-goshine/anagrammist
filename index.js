
// List of some very intersting anagrams
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

// Data Source
var inputWord = 'rat';
var list = ['art', 'tar', 'rat', 'start', 'stars', 'fare', 'rafe'];
var listCache = {};

var result = [];

// Recalculate list length
function getll () {
  return list.length;
}

function sortStr (str) {
  return str.split('').sort().join('');
}

// easy way to check if words are anagram
function isAnagram (wordA, wordB) {
  return sortStr(wordA) === sortStr(wordB);
}

// the diry work is done here only if the cache does note
// have the answers that are required for the user specific word.

function searchForAnagram (targetWord, resultCallback) {
  result = [];
  if (!targetWord) return;
  for (var i = getll(); i--;) {
    var currentWord = list[i];
    if (isAnagram(targetWord, currentWord)) {
      if (resultCallback !== undefined &&
          typeof resultCallback === 'function') {
        resultCallback(currentWord);
      };
      var key = sortStr(currentWord);
      if (!listCache[key]) listCache[key] = [];
      listCache[key].push(currentWord);
      list.splice(i, 1);
    }
  }
}

// here we are converting the supplied list to an
// lovely hashmap...
function prerender () {
  for (var i = getll(); i--;) {
    searchForAnagram(list[i]);
  }
}

function main () {
  prerender();

  var key = sortStr(inputWord);
  if (listCache[key]) {
    console.log(listCache[key]);
  } else {
    searchForAnagram(inputWord, function (item) {
      result.pus(item);
    });
    if (result.length > 0) {
      console.log(result.join());
    } else {
      console.log('No can\'t find any anagrams.');
    }
  }
}
// prerender is quadratic at the moment, so not suitable for large list
// however if we are supplied with an hashmap in the format of
// listCache where the key is a alphabetically sorted word comprises of
// the letters contained within the anagrams them we would get constant time.

main();
