import "./Goal.sol";
contract Goalie {

    /* STATE */
    address owner;
    mapping (address => User) users;
    mapping (uint => address) goalChildren;
    uint totalUsers;

    /* EVENTS */
    event GoalAdded(uint goalID, address owner, string description);

    /* MODIFIERS */
    modifier onlyUser {
        User u = users[msg.sender];
        if (u.id != msg.sender)
                throw;
        _
    }


    /* TYPES */
    struct User {
        address id;
        string name;
        address[] ownGoals;
        address[] trusteeGoals;
    }

    /* CONSTRUCTOR */
    function Goalie() {
        owner = msg.sender;
    }

    /* FUNCTIONS */
    function registerUser(string _name) {
        User u = users[msg.sender];
        if(u.id != 0x0) throw;
        u.id = msg.sender;
        u.name = _name;
    }

    function getUser() {

    }

    function createGoal(
        string _title,
        string _description,
        address _beneficiary,
        address _trustee,
        uint _timeLimitInDays
    ) onlyUser {
        // Create the new goal
        address goalAddress = new Goal(
            msg.sender,
            _title,
            _description,
            _beneficiary,
            _trustee,
            _timeLimitInDays
        );


    }

	function saveGoalAddressToUser(address _userID,
                                   address _goalAddress) private {
        User u = users[_userID];
        u.ownGoals.push(_goalAddress);
    }

    function saveGoalAddressToTrustee(address _trusteeID,
                                      address _goalAddress) private {
        User u = users[_trusteeID];
        u.trusteeGoals.push(_goalAddress);
    }

    function approveGoal() {

    }

    function getGoalAddressFromID() {

    }

    /* Destroys the contract and releases all funds. */
    function destroy() {

    }
}
