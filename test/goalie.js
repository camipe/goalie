/* eslint-disable */
var Goalie = artifacts.require("./Goalie.sol");

contract('Goalie', function(accounts) { 

  it("...add new goal", function() {

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

  it("...pay out to owner if approved and deadline has passed", function() {
    throw Error;
  });

  it("...should pay out to beneficiary if approved and deadline has passed", function() {
    
  });

  it("...should pay out to owner if approved and deadline has NOT passed", function() {
    
  });

  it("...should NOT pay out to beneficiary if approved and deadline has NOT passed", function() {
    
  });

  it("...friend should be able to approve goal", function() {
    
  });

  it("...getGoalsByBeneficiary should return array of ids where address is beneficiary", function() {
    
  });

  it("...getGoalsByFriend should return array of ids where address is friend", function() {
    
  });

  it("...getGoalsByOwnery should return array of ids where address is owner", function() {
    
  });

  it("...should not pay out twice to owner", function() {
    
  });

  it("...should not pay out twice to beneficiary", function() {
    
  });

  
});
