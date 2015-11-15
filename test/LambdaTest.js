var context = {
    invokeid: 'invokeid',
    succeed: function(msg){
    },
    fail: function(msg){
    }
};

describe('lambda handleのテスト',function(){
  var lambda = require("../app");
  it('opeが指定されていない場合', function(){
    var event = {word:"進撃の"};
    var context = {
      fail: function(msg) {
        expect(msg).toBe("Unknown ope type [undefined]");
      }
    }
    lambda.handler(event,context);
  });

  it("ope=searchの場合", function(){
    var event = {ope: "search", word:"進撃の"};
    var context = {
      succeed: function(msg) {
        expect(msg).toBe("Unknown ope type [undefined]");
      },
      fail: function(msg) {
        fail();
      }
    }
    lambda.handler(event,context);
  });

  it("ope=contentの場合", function(){
    var event = {ope: "content", word:"進撃の"};
    var context = {
      succeed: function(msg) {
        expect(msg).toBe("Unknown ope type [undefined]");
      },
      fail: function(msg) {
        fail();
      }
    }
    lambda.handler(event,context);
  });
});
