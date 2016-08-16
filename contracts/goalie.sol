import "./Goal.sol";
contract Goalie {

    /* STATE */
    address owner;
    mapping (address => User) users;
    uint totalUsers;

    /* EVENTS */
    event GoalCreated(address user, address goalAddress, string title, string description);

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

    function getOwnUser() returns (address id, string name, address[] ownGoals, address[] trusteeGoals) {
        User u = users[msg.sender];
        id = u.id;
        name = u.name;
        ownGoals = u.ownGoals;
        trusteeGoals = u.trusteeGoals;
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

        saveGoalAddressToUser(msg.sender, goalAddress);
        saveGoalAddressToTrustee(_trustee, goalAddress);

        GoalCreated(msg.sender, goalAddress, _title, _description);
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

    function approveGoal(address _goalAddress) {
        Goal g = Goal(_goalAddress);
        g.call;
    }

    function transferToUser(address _goalAddress) {
        Goal g = Goal(_goalAddress);
        if (g.user() != msg.sender) throw;
        g.transferToUser();
    }

    function transferToBeneficiary(address _goalAddress) {
        Goal g = Goal(_goalAddress);
        if (g.trustee() != msg.sender) throw;
        g.transferToUser();
    }


    /* Destroys the contract and releases all funds. */
    function destroy() {

    }
}
