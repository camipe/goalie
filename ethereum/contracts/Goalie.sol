pragma solidity 0.4.25; // solhint-disable-line
import "./GoalFactory.sol";


contract Goalie is GoalFactory {

  event GoalApproved(uint _goalId, string _title);

  /** @dev Modifier to make sure function can only be used by goal owner
    * @param _goalId id of the goal which will be changed
    */
  modifier onlyGoalOwner(uint _goalId) {
    require(goalToOwner[_goalId] == msg.sender);
    _;
  }

  /** @dev Modifier to make sure function can only be used by the friend/approver of a goal
    * @param _goalId id of the goal which will be changed
    */
  modifier onlyGoalFriend(uint _goalId) {
    require(goalToFriend[_goalId] == msg.sender);
    _;
  }

  /** @dev Modifier to make sure function can only be used by the beneficiary of a goal
    * @param _goalId id of the goal which will be changed
    */
  modifier onlyBeneficiary(uint _goalId) {
    require(goalToBeneficiary[_goalId] == msg.sender);
    _;
  }

  /** @dev Modifier to make sure deadline of a goal has passed
    * @param _goalId id of the goal which will be changed
    */
  modifier deadlinePassed(uint _goalId) {
    Goal storage goal = goals[_goalId];
    require(goal.deadline <= now); 
    _;
  }
  
  /** @dev Public function to get ids of all goals where a specific address is owner
    * @param _owner Address of a potental goal owner
    * @return an array of all matching goal ids
    */
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

  /** @dev Public function to get ids of all goals where a specific address is friend
    * @param _friend Address of a potential friend
    * @return an array of all matching goal ids
    */
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

  /** @dev Public function to get ids of all goals where a specific address is beneficiary
    * @param _beneficiary Address of a potential beneficiary
    * @return an array of all matching goal ids
    */
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

    /** @dev Public function for approving a goal
    * @param _goalId id of the goal to approve
    */
  function approveGoal(uint _goalId) public onlyGoalFriend(_goalId) {
    Goal storage goal = goals[_goalId];
    goal.approved = true;
  }

    /** @dev Public function for completing a goal and paying back the owner
    * @param _goalId id of the goal to complete
    */
  function payOwner(uint _goalId) public onlyGoalOwner(_goalId) deadlinePassed(_goalId) {
    Goal storage goal = goals[_goalId];

    // make sure goal is approved and hasn't been completed before
    require(goal.approved == true);
    require(goal.complete == false);

    // pay out to goal.owner
    address owner = goal.owner;
    owner.transfer(goal.amount);

    goal.complete = true;
  }

    /** @dev Public function for completing a goal and paying out to the beneficiary
    * @param _goalId id of the goal to complete
    */
  function payBeneficiary(uint _goalId) public onlyBeneficiary(_goalId) deadlinePassed(_goalId) {
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
