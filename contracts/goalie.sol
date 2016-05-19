contract Goalie {

    /* STATE */
    Goal[] public goals; //TODO: Change to uint ID-mapping
    uint totalGoals;

    /* EVENTS */
    event GoalAdded(uint goalID, address owner, string description);

    /* TYPES */
    struct Goal {
        address owner;
        string title;
        string description;
        uint timeLimit; // Not implemented yet
        Status status;
        /*Trustee[] trustee;*/
        address beneficiary;
    }

    struct Trustee{
        address id;
        bool approved;
    }

    enum Status { InProgress, Complete, Failed }

    /* CONSTRUCTOR */
    function Goalie() {

    }

    /* FUNCTIONS */

    /* Add a new goal to the contract. */
    function addGoal(
        string title,
        string description,
        address beneficiary,
        address[] trustees
    )
        public returns (uint goalID)
    {
        goalID = goals.length++;
        Goal g = goals[goalID];

        g.owner = msg.sender;
        g.title = title;
        g.description = description;
        g.timeLimit = 0;
        g.status = Status.InProgress;
        
        /*g.trustee[0] = Trustee({id: trustee, approved: false});*/
        g.beneficiary = beneficiary;
        GoalAdded(goalID, msg.sender, description);
        totalGoals = goalID + 1;
    }

    /* Used by trustees to approve that a goal has been reached. */
    function approveGoal(uint goalID) {
        Goal g = goals[goalID];

        // Throw if sender address is not trustee.
        if (g.trustee[0].id != msg.sender) throw;
        // Throw if goal not in progress.
        if (g.status != Status.InProgress) throw;

        // Change trustee's approval status
        g.trustee[0].approved = true;

    }

    function updateStatus(uint goalID) {
        Goal g = goals[goalID];

        if (g.trustee[0].approved == false) throw;

        g.status = Status.Complete;
    }

    /* Releases the funds to if goal has been approved by trustees
    else it releases to the beneficiary.
    Can only be called when timelimit has been reached. */
    function releaseFunds() {

    }
    /* Destroys the contract and releases all funds. */
    function destroy() {

    }
}
