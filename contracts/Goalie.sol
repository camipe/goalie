pragma solidity 0.4.24; // solhint-disable-line
import "./GoalFactory.sol";


contract Goalie is GoalFactory {

  event GoalApproved(uint _goalId, string _title);

  uint goalFee = 0.01 ether;

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

  // TODO: getGoalsWhereOwner
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

  // TODO: getGoals by friend
  function getGoalsByFriend(address _friend) external view returns(uint[]) {
    uint[] memory result = new uint[](friendsGoalCount[_friend]);
    uint counter = 0;
    for (uint i = 0; i < goals.length; i++) {
      Goal storage goal = goals[i];
      for (uint j = 0; j < goal.nrOfFriends; j++) {
        if (goal.friends[_friend] == true) {
          result[counter] = i;
          counter++;
        } 
      }
    }
    return result;
  }

  // getgoals by beneficiary
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
  function payOwner(uint _goalId) public onlyGoalOwner(_goalId) deadlinePassed(_goalId) returns (uint) {
    Goal storage goal = goals[_goalId];

    // make sure goal is approved
    require(goal.approvals.length == goal.nrOfFriends);

    // pay out to goal.owner
    address owner = goal.owner;
    owner.transfer(goal.amount - goalFee);
  }

  function payBeneficiary(uint _goalId) public onlyBeneficiary(_goalId) deadlinePassed(_goalId) returns (uint) {
    Goal storage goal = goals[_goalId];

    // make sure goal is approved
    require(goal.approvals.length < goal.nrOfFriends);

    // pay out to goal.owner
    address beneficiary = goal.beneficiary;
    beneficiary.transfer(goal.amount - goalFee);
  }

}