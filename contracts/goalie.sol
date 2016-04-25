contract Goalie {

    /* Variables */
    address public beneficiary // Address which will recieve funds if goal is not reached

    /* Structs */
    struct Goal {
        string title;
        string description;
        uint timeLimit;
    }
    
    /* Constructor */
    function Goalie() {

    }

    /* Functions */
    function vote(
        uint proposalId,
        bool vote
        ) {
        // If sender address is not in Trustees throw;

        // Update goal votes


    }
}
