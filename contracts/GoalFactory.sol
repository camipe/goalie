pragma solidity 0.4.20;
import "./Ownable.sol";


contract GoalFactory is Ownable {
  
  event NewGoal();

  // goal struct
  struct Goal {
    string title;
    string description;
    address owner;
    address[] friends;
    uint amount;
    uint deadline;
  }

  // goal array

  // mapping goal to addresses

  // function _createGoal()

  // function newGoal()
}

    address parent;
    address public user;
    address public trustee;
    address public beneficiary;
    string public title;
    string public description;
    uint public amount;
    uint public deadline;
Status public status;