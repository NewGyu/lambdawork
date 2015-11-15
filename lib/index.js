"use strict";

var wikipedia = require("./api/wikipedia");
var Promise = require("bluebird");

function getWikipediaKeyphrase(word) {
  return new Promise(function(resolve, reject){
    getWikipediaContent(word).then(function(content){
      resolve({keyphrase: keyphrase(content)});
    }).catch(function(err){
      reject(err)
    });
  });
}

function keyphrase(wikitext) {
  var regexp =  /\[\[([^\]]+)\]\]/g;
  var arr = [];
  var m;
  while ((m = regexp.exec(wikitext)) != null) {
    arr.push(m[1]);
  }
  return arr;
}

function getWikipediaContent(word) {
  return new Promise(function(resolve, reject){
    wikipedia.search(word).then(function(res){
      if(! res.query.search) throw new Error("not found");
      return res.query.search[0].title;
    }).then(function(foundTitle){
      wikipedia.content(foundTitle).then(function(res){
        for(var p in res.query.pages) {
          var page = res.query.pages[p];
          resolve(page.revisions[0]["*"]);
          return;
        }
      })
    }).catch(function(err){
      reject(err);
    });
  });
}

module.exports.getWikipediaContent = getWikipediaContent;
module.exports.getWikipediaKeyphrase = getWikipediaKeyphrase;
