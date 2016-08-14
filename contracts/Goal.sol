contract Goal {
    /* STATE */
    address parent;
    address user;
    address trustee;
    address beneficiary;
    string title;
    string description;
    uint amount;
    uint deadline;
    Status status;

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
    function approve() {
        // Throw if sender address is not trustee.
        if (trustee != msg.sender) throw;
        // Throw if goal is not of status active.
        if (status != Status.Active) throw;

        // Change trustee's approval status
        status = Status.Approved;
    }

    /* Releases the funds to owner if goal has been approved by trustees
    else it releases to the beneficiary.
    Can only be called when timelimit has been reached. */
    function releaseFunds() {
        if (deadline > now) throw;

        if (status == Status.Approved) {
            owner.send(amount);
            status = Status.Complete;
        } else {
            beneficiary.send(amount);
            status = Status.Failed;
        }

    }
}
