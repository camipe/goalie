pragma solidity 0.4.24; // solhint-disable-line
import "./GoalFactory.sol";


contract Goalie is GoalFactory {

  event GoalApproved(uint _goalId, string _title);

  modifier onlyGoalOwner(uint _goalId) {
    require(goalToOwner[_goalId] == msg.sender);
    _;
  }

  modifier onlyGoalFriend(uint _goalId) {
    require(goalToFriend[_goalId] == msg.sender);
    _;
  }

  modifier onlyBeneficiary(uint _goalId) {
    require(goalToBeneficiary[_goalId] == msg.sender);
    _;
  }

  modifier deadlinePassed(uint _goalId) {
    Goal storage goal = goals[_goalId];
    require(goal.deadline <= now); 
    _;
  }

  function getGoalsByOwner(address _owner) external view returns(uint[]) {
    uint[] memory result = new uint[](ownerGoalCount[_owner]);
    uint counter = 0;
    for (uint i = 0; i < goals.length; i++) {
      if (goalToOwner[i] == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

  function getGoalsByFriend(address _friend) external view returns(uint[]) {
    uint[] memory result = new uint[](friendsGoalCount[_friend]);
    uint counter = 0;
    for (uint i = 0; i < goals.length; i++) {
      if (goalToFriend[i] == _friend) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

  function getGoalsByBeneficiary(address _beneficiary) external view returns(uint[]) {
    uint[] memory result = new uint[](beneficiaryGoalCount[_beneficiary]);
    uint counter = 0;
    for (uint i = 0; i < goals.length; i++) {
      if (goalToBeneficiary[i] == _beneficiary) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

  // approve goal
  function approveGoal(uint _goalId) public onlyGoalFriend(_goalId) returns (uint) {
    Goal storage goal = goals[_goalId];
    goal.approved = true;
  }

  // pay out
  function payOwner(uint _goalId) public onlyGoalOwner(_goalId) deadlinePassed(_goalId) returns (uint) {
    Goal storage goal = goals[_goalId];

    // make sure goal is approved and hasn't been completed before
    require(goal.approved == true);
    require(goal.complete == false);

    // pay out to goal.owner
    address owner = goal.owner;
    owner.transfer(goal.amount);

    goal.complete = true;
  }

  function payBeneficiary(uint _goalId) public onlyBeneficiary(_goalId) deadlinePassed(_goalId) returns (uint) {
    Goal storage goal = goals[_goalId];

    // make sure goal is not approved and hasn't been completed before
    require(goal.approved == false);
    require(goal.complete == false);

    // pay out to goal.owner
    address beneficiary = goal.beneficiary;
    beneficiary.transfer(goal.amount);

    goal.complete = true;
  }

}
