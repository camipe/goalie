pragma solidity 0.4.25; // solhint-disable-line


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
  
  // testing function
  function checkBalance() public view returns (uint) {
    return address(this).balance;
  }
  
  /** @dev Public function for approving a goal
  * can only be run by friend
  */
  function approveGoal() public {
    require(details.friend == msg.sender);
    details.approval = true;
  }

    /** @dev Public function for completing a goal and paying back the owner
    *  can only be run by owner
    */
  function payOwner() public deadlinePassed() {
    require(details.owner == msg.sender);
    
    // make sure goal is approved and hasn't been completed before
    require(details.approval == true);
    require(details.complete == false);

    // complete goal and pay out balance to goal owner
    details.complete = true;
    details.owner.transfer(address(this).balance);
  }

    /** @dev Public function for completing a goal and paying out to the beneficiary*/
  function payBeneficiary() public deadlinePassed() {
    require(details.beneficiary == msg.sender);

    // make sure goal is not approved and hasn't been completed before
    require(details.approval == false);
    require(details.complete == false);

    // complete goal and pay out balance to goal beneficiary
    details.complete = true;
    details.beneficiary.transfer(address(this).balance);
  }

}
