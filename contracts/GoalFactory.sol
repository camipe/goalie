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
    uint amount;
    uint deadline;
    uint nrOfFriends;
    address[] approvals;
    mapping (address => bool) friends;
  }

  // goal array
  Goal[] public goals;

  // mapping goal to addresses
  mapping (uint => address) public goalToOwner;
  mapping (address => uint) internal ownerGoalCount;

  mapping (uint => address) public goalToBeneficiary;
  mapping (address => uint) internal beneficiaryGoalCount;

  mapping (address => uint) internal friendsGoalCount;

  // function addGoal()
  function addGoal(    
    string _title, 
    string _description, 
    address _beneficiary, 
    address[] _friends,
    uint _deadline) public payable {
    // make sure user payed something
    require(msg.value > 0);
    _createGoal(_title, _description, _beneficiary, _friends, msg.value, _deadline);
  }

  // function _createGoal()
  function _createGoal(
    string _title, 
    string _description, 
    address _beneficiary, 
    address[] _friends, 
    uint _amount, 
    uint _deadline) internal {
    address[] memory approvals;
    // create goal and update indexes
    uint id = goals.push(Goal(
      _title, 
      _description, 
      msg.sender, 
      _beneficiary, 
      _amount, 
      _deadline, 
      _friends.length,
      approvals)) - 1;

    for (uint i = 0; i < _friends.length; i++) {
      goals[id].friends[_friends[i]] = true;
      friendsGoalCount[_friends[i]]++;
    }
    
    goalToOwner[id] = msg.sender;
    ownerGoalCount[msg.sender]++;
    goalToBeneficiary[id] = _beneficiary;
    beneficiaryGoalCount[_beneficiary]++;

    emit NewGoal(id, _title);// solhint-disable-line
  }  
}
