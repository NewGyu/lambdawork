/*jslint node: true */
/*eslint-env node, mocha */

"use strict";

var Promise = require("bluebird");
var logic = require("./lib");

exports.handler = function(event, context){
  switch (event.ope) {
    case "keyphrase":
      logic.getWikipediaKeyphrase(decodeURI(event.word)).then(function(k){
        context.succeed(k);
      }).catch(function(err){
        context.fail(err);
      });
      break;
    case "content":
      logic.getWikipediaContent(decodeURI(event.word)).then(function(c){
        context.succeed({content: c});
      }).catch(function(err){
        context.fail(err);
      });
      break;
    default:
      context.fail("Unknown ope type [" + event.ope + "]");
  }
};
