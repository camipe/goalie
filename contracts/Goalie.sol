pragma solidity 0.4.24; // solhint-disable-line
import "./GoalFactory.sol";


contract Goalie is GoalFactory {

  event GoalApproved(uint _goalId, string _title);

  modifier onlyGoalOwner(uint _goalId) {
    require(goalToOwner[_goalId] == msg.sender);
    _;
  }

  modifier onlyGoalFriend(uint _goalId) {
    Goal storage goal = goals[_goalId];
    require(goal.friends[msg.sender] == true);
    _;
  }

  modifier onlyBeneficiary(uint _goalId) {
    Goal storage goal = goals[_goalId];
    require(goal.beneficiary == msg.sender);
    _;
  }

  modifier deadlinePassed(uint _goalId) {
    Goal storage goal = goals[_goalId];
    require(goal.deadline <= now); 
    _;
  }

  // approve goal
  function approveGoal(uint _goalId) public onlyGoalFriend(_goalId) returns (uint) {
    //TODO: start here
    Goal storage goal = goals[_goalId];
    bool approve = true;
    for (uint i = 0; i < goal.nrOfFriends; i++) {
      if (goal.approvals[i] == msg.sender) {
        approve = false;
      }
    }
    if (approve = true) {
      goal.approvals.push(msg.sender);
    }
  }

  // pay out
  function completepayOwnerGoal(uint _goalId) public onlyGoalOwner(_goalId) deadlinePassed(_goalId) returns (uint) {
    
  }

  function payBeneficiary(uint _goalId) public onlyGoalOwner(_goalId) deadlinePassed(_goalId) returns (uint) {
    
  }
}