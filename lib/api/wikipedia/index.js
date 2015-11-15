"use strict";

var httpRequest = require("request-promise");
var Promise = require("bluebird");
var clone = require("clone");

var OPT = {
  uri: "https://ja.wikipedia.org/w/api.php",
  json: true
}

module.exports.search = function(word) {
  var reqopt = clone(OPT);
  reqopt.qs = {
    action: "query",
    list: "search",
    format: "json",
    srlimit: 1,
    srprop: "timestamp",
    srsearch: word
  }
  return httpRequest(reqopt);
}

module.exports.content = function(title) {
  var reqopt = clone(OPT);
  reqopt.qs = {
    action: "query",
    prop: "revisions",
    rvprop: "content",
    format: "json",
    titles: title
  }
  return httpRequest(reqopt);
}
