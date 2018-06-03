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
    Goal storage goal = goals[_goalId];
    bool approve = true;
    uint counter = 0;
    for (uint i = 0; i < goal.nrOfFriends; i++) {
      if (goal.approvals[counter] == msg.sender) {
        approve = false;
      }
      counter++;
    }
    if (approve = true) {
      goal.approvals.push(msg.sender);
    }
  }

  // pay out
  function completepayOwnerGoal(uint _goalId) public onlyGoalOwner(_goalId) deadlinePassed(_goalId) returns (uint) {
    // require goalIsApproved
    // pay out to goal.owner
  }

  function payBeneficiary(uint _goalId) public onlyGoalOwner(_goalId) deadlinePassed(_goalId) returns (uint) {
    // check goal is not Approved
    // pay out to goal.beneficiary
  }

  // TODO: getGoalsWhereOwner
  function getGoalsByOwner(address _owner) {
    uint[] memory result = new uint[](ownerGoalCount(_owner));
    uint counter = 0;
    for (uint i = 0; i < goals.length; i++) {
      if (zombieToOwner[i] == _owner) {
        result[counter] = i;
        counter++;
      }
    }
return result;
  }

  // TODO: getGoals where friend

  // TODO: getgoals where beneficiary
}