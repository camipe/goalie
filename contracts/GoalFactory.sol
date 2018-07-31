pragma solidity 0.4.24; // solhint-disable-line
import "./Ownable.sol";


contract GoalFactory is Ownable {
  
  event NewGoal(uint goalId, string title);

  // goal struct
  struct Goal {
    uint id;
    string title;
    string description;
    address owner;
    address beneficiary;
    address friend;
    uint amount;
    uint deadline;
    bool approved;
    bool complete;
  }

  // goal array
  Goal[] public goals;

  // mapping goal to addresses
  mapping (uint => address) public goalToOwner;
  mapping (address => uint) internal ownerGoalCount;

  mapping (uint => address) public goalToBeneficiary;
  mapping (address => uint) internal beneficiaryGoalCount;

  mapping (uint => address) public goalToFriend;
  mapping (address => uint) internal friendsGoalCount;

  // function addGoal()
  function addGoal(    
    string _title, 
    string _description, 
    address _beneficiary, 
    address _friend,
    uint _deadline) public payable {
    // make sure user payed something
    require(msg.value > 0);
    _createGoal(_title, _description, _beneficiary, _friend, msg.value, _deadline);
  }

  // function _createGoal()
  function _createGoal(
    string _title, 
    string _description, 
    address _beneficiary, 
    address _friend, 
    uint _amount, 
    uint _deadline) internal {
    // create goal and update indexes
    uint id = goals.push(Goal(
      goals.length,
      _title, 
      _description, 
      msg.sender,
      _beneficiary,
      _friend,
      _amount,
      _deadline,
      false,
      false)) - 1;
    
    goalToOwner[id] = msg.sender;
    ownerGoalCount[msg.sender]++;
    goalToBeneficiary[id] = _beneficiary;
    beneficiaryGoalCount[_beneficiary]++;
    goalToFriend[id] = _friend;
    friendsGoalCount[_friend]++;

    emit NewGoal(id, _title);// solhint-disable-line
  }  
}
