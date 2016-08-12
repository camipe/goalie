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
        uint amount;
        uint deadline;
        Status status;
        address trustee;
        address beneficiary;
    }

    enum Status { InProgress, Approved, Complete, Failed }

    /* CONSTRUCTOR */
    function Goalie() {

    }

    /* FUNCTIONS */

    /* Add a new goal to the contract. */
    function addGoal(
        string title,
        string description,
        address beneficiary,
        address trustee,
        uint timeLimitInDays
    )
        public returns (uint goalID)
    {
        goalID = goals.length++;
        Goal g = goals[goalID];

        g.owner = msg.sender;
        g.title = title;
        g.description = description;
        g.amount = msg.value;
        g.deadline = now + timeLimitInDays * 1 days;
        g.status = Status.InProgress;

        g.trustee = trustee;
        g.beneficiary = beneficiary;
        GoalAdded(goalID, msg.sender, description);
        totalGoals = goalID + 1;
    }

    /* Used by trustees to approve that a goal has been reached. */
    function approveGoal(uint goalID) {
        Goal g = goals[goalID];

        // Throw if sender address is not trustee.
        if (g.trustee != msg.sender) throw;
        // Throw if goal not in progress.
        if (g.status != Status.InProgress) throw;

        // Change trustee's approval status
        g.status = Status.Approved;

    }

    /* Releases the funds to owner if goal has been approved by trustees
    else it releases to the beneficiary.
    Can only be called when timelimit has been reached. */
    function releaseFunds(uint goalID) {
        Goal g = goals[goalID];

        if (g.deadline > now) throw;

        if (g.status == Status.Approved) {
            g.owner.send(g.amount);
        } else {
            g.beneficiary.send(g.amount);
        }

    }
    /* Destroys the contract and releases all funds. */
    function destroy() {

    }
}
