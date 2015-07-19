if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Server Test", function(){
      it("should work", function(){
        chai.expect(true).to.equal(true);
      });
    });
  });
}
