contract Goal {
    /* STATE */
    address parent;
    address public user;
    address public trustee;
    address public beneficiary;
    string public title;
    string public description;
    uint public amount;
    uint public deadline;
    Status public status;

    /* MODIFIERS */
    modifier onlyParent {
        if (parent != msg.sender)
                throw;
        _
    }
    enum Status { Active, Approved, Complete, Failed }

    /* CONSTRUCTOR */
    function Goal(
        address _user,
        string _title,
        string _description,
        address _beneficiary,
        address _trustee,
        uint _timeLimitInDays
    ){
        parent = msg.sender;
        user = _user;
        title = _title;
        description = _description;
        amount = msg.value;
        deadline = now + _timeLimitInDays * 1 days;
        status = Status.Active;

        trustee = _trustee;
        beneficiary = _beneficiary;
    }

    /* Used by trustees to approve that a goal has been reached. */
    function approve() onlyParent {

        // Throw if goal is not of status active.
        if (status != Status.Active) throw;

        // Change trustee's approval status
        status = Status.Approved;
    }

    /* Releases the funds to owner if goal has been approved by trustees
    else it releases to the beneficiary.
    Can only be called when timelimit has been reached. */
    function transferToUser() onlyParent {
        if (deadline > now) throw;

        if (status == Status.Approved) {
            user.send(amount);
            status = Status.Complete;
        }
    }

    function transferToBeneficiary() onlyParent {
        if (deadline > now) throw;

        if (status != Status.Approved) {
            beneficiary.send(amount);
            status = Status.Failed;
        }

    }

    function getGoalInfo() returns (
        address user,
        address trustee
        ) {

        user = this.user;
        trustee = this.trustee;
        /*beneficiary = this.beneficiary;
        title = this.title;
        description = this.description;
        amount = this.amount;
        deadline = this.deadline;*/
    }
}
