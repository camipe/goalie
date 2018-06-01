pragma solidity 0.4.24; // solhint-disable-line
import "./Ownable.sol";


contract GoalFactory is Ownable {
  
  event NewGoal(uint goalId, string title);

  // goal struct
  struct Goal {
    string title;
    string description;
    address owner;
    address beneficiary;
    address[] friends;
    uint amount;
    uint deadline;
  }

  // goal array
  Goal[] public goals;

  // mapping goal to addresses
  mapping (uint => address) public goalToOwner;
  mapping (address => uint) internal ownerGoalCount;

  // function addGoal()
  function addGoal(    
    string _title, 
    string _description, 
    address _beneficiary, 
    address[] _friends, 
    uint _amount, 
    uint _deadline) public {
    // just running internal create function, will probably add validation here
    _createGoal(_title, _description, _beneficiary, _friends, _amount, _deadline);
  }

  // function _createGoal()
  function _createGoal(
    string _title, 
    string _description, 
    address _beneficiary, 
    address[] _friends, 
    uint _amount, 
    uint _deadline) internal {
    // create goal and update indexes
    uint id = goals.push(Goal(_title, _description, msg.sender, _beneficiary, _friends, _amount, _deadline));
    goalToOwner[id] = msg.sender;
    ownerGoalCount[msg.sender]++;

    NewGoal(id, _title);
  }  
}
