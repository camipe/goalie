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

  // approve goal
  function approveGoal(uint _goalId) public onlyGoalFriend(_goalId) returns (uint) {
    
  }

  // pay out
  function completeGoal(uint _goalId) public onlyGoalOwner(_goalId) returns (uint) {
    
  }
}