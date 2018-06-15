/* eslint-disable */
var Goalie = artifacts.require("./Goalie.sol");

contract('Goalie', function(accounts) { 

  it("...should add new goal", function() {

    // create goal object
    return Goalie.deployed().then(function(instance) {
      // create goal object
      // send addgoal(goal)

      // return read of goals array
      // assert goals is not empty
      // assert goal is created with correct values
      simpleStorageInstance = instance;

      return simpleStorageInstance.set(89, {from: accounts[0]});
    }).then(function() {
      
    }).then(function(goals) {

    });
  });
});
