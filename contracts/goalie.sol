contract Goalie {

    /* STATE */
    Goal[] public goals;

    /* TYPES */
    struct Goal {
        address owner;
        string title;
        string description;
        uint timeLimit; // Not implemented yet
        address trustee;
        address beneficiary;
    }

    struct Trustee{
        address id;
        bool approved;
    }

    /* CONSTRUCTOR */
    function Goalie() {

    }

    /* FUNCTIONS */

    /* Add a new goal to the contract. */
    function addGoal(
        address beneficiary,
        string title,
        string description,
        address trustee
    )
        returns (uint goalID)
    {
        goalID = goals.length++;
        Goal g = goals[goalID];

        g.owner = msg.sender;
        g.title = title;
        g.description = description;
        g.timeLimit = 0;
        g.trustee = trustee;
        g.beneficiary = beneficiary;
    }

    /* Used by trustees to approve that a goal has been reached. */
    function approveGoal(
        uint goalID,
        bool vote
        ) {
        // If sender address is not in Trustees throw;

        // Update goal votes
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
