pragma solidity 0.4.25; // solhint-disable-line
import "./Goalie.sol";


contract GoalieFactory {
  
  address[] public goalies;

  // TODO: implement ownable with ability to clear goalies array for testing purposes
  // TODO: check if these three can be implemented in solidity or if it's better to do on frontend
  function goaliesByOwner() external view returns (address[]) {
    address[] empty = [];
    return empty; 
  }

  function goaliesByBeneficiary() external view returns (address[]) {
    address[] empty = [];
    return empty; 
  }

  function goaliesByBeneficiary() external view returns (address[]) {
    address[] empty = [];
    return empty; 
  }

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
