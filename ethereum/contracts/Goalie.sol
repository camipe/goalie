pragma solidity 0.4.25; // solhint-disable-line


contract GoalieFactory {
  
  address[] public goalies;

  /** @dev Public function for returning addresses of all goalies
  *
  */
  function getGoalies() external view returns (address[]) {
    return goalies;
  }

  /** @dev Public function for creating new goalies
  *
  */
  function createGoalie(        
        string _title, 
        string _description,
        uint _deadline,
        address _beneficary, 
        address _friend) public payable {
    
    address newAdress = (new Goalie).value(msg.value)(
      _title, _description, _deadline, msg.sender, _beneficary, _friend);
    
    goalies.push(newAdress);
  }
}


contract Goalie {
  
  struct Details {
    string title;
    string description;
    uint deadline;
    address owner;
    address beneficiary;
    address friend;
    bool approval;
    bool complete;
  } 

  Details public details;

  constructor(
    string _title, 
    string _description,
    uint _deadline,
    address _owner, 
    address _beneficary, 
    address _friend
  ) public payable {

    require(msg.value >= 0.001 ether);
  
    details = Details({
      title: _title,
      description: _description,
      deadline: _deadline,
      owner: _owner,
      beneficiary: _beneficary,
      friend: _friend,
      approval: false,
      complete: false
    });
  }

  /** @dev Modifier to make sure deadline of a goal has passed */
  modifier deadlinePassed() {
    require(details.deadline <= now); 
    _;
  }
  
  /** @dev Public function for approving a goal
  * can only be run by friend
  */
  function approveGoal() public {
    require(details.friend == msg.sender);
    details.approval = true;
  }

  /** @dev Used to completing a goal and pay out to owner or beneficiary depending on approval status
  *
  */
  function completeGoal() public deadlinePassed() {
    require(msg.sender == details.owner || msg.sender == details.beneficiary);

    if (details.approval && !details.complete) {
      // pay out to the owner if the goal is approved but not completed
      details.complete = true;
      details.owner.transfer(address(this).balance);
    } else if (!details.approval && !details.complete) {
      // pay out to beneficiary if the goal is not approved and not completed
      details.complete = true;
      details.beneficiary.transfer(address(this).balance);
    }
  }
}
