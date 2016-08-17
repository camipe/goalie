var accounts;
var account;
var balance;

function renderUserInfo() {
  var goalie = Goalie.deployed();
  goalie.getOwnUser.call({from: account}).then(function(user) {
    console.log(user);
    var userName = document.getElementById("userName");
    var userID = document.getElementById("userID");
    var nrUserGoals = document.getElementById("nrUserGoals");
    var nrTrusteeGoals = document.getElementById("nrTrusteeGoals");

    userName.innerHTML = user[1];
    userID.innerHTML = user[0]
    nrUserGoals.innerHTML = user[2].length;
    nrTrusteeGoals.innerHTML = user[3].length;

  }).catch(function(e) {
    console.log(e);
  });

}

function renderOwnGoals() {

  var goalie = Goalie.deployed();
  goalie.getOwnUser.call({from: account}).then(function(user) {

    renderOwnGoal(user[2][0]);

  }).catch(function(e) {
    // console.log(e);
  });


}

function renderOwnGoal(_goalAddress) {

  var goal = Goal.at(_goalAddress);
  console.log(_goalAddress);
  goal.getGoalInfo.call({from: account}).then(function(goal) {
    // console.log(goal);
    // var userGoalDiv = document.createElement("div");
    // userGoalDiv.className = "userGoal";
    //
    // var goalTitle = document.createElement("h4");
    // userGoalDiv.appendChild(goalTitle);
    // var goalDescription = document.createElement("span");
    // userGoalDiv.appendChild(goalDescription);
    // var goalAmount = document.createElement("span");
    // userGoalDiv.appendChild(goalAmount);
    // var goalTrustee = document.createElement("span");
    // userGoalDiv.appendChild(goalTrustee);
    // var goalBeneficiary = document.createElement("span");
    // userGoalDiv.appendChild(goalBeneficiary);
    // var goalDeadline = document.createElement("span");
    // userGoalDiv.appendChild(goalDeadline);
    //
    // // goalTitle.innerHTML = "Title" + goal[3];
    // // goalDescription.innerHTML = "Title" + goal[4];
    // // goalAmount.innerHTML = "Title" + goal[5].toString();
    // // goalTrustee.innerHTML = "Title" + goal[1];
    // // goalBeneficiary.innerHTML = "Title" + goal[2];
    // // goalDeadline.innerHTML = "Title" + goal[6].toString();
    //
    // var userGoalsDiv = document.getElementById("userGoals");
    // userGoalsDiv.appendChild(userGoalDiv);

  }).catch(function(e) {
    console.log(e);
  });
}

function renderTrusteeGoals() {

}

function renderTrusteeGoals() {

}


function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
  var meta = MetaCoin.deployed();

  meta.getBalance.call(account, {from: account}).then(function(value) {
    var balance_element = document.getElementById("balance");
    balance_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};

function sendCoin() {
  var meta = MetaCoin.deployed();

  var amount = parseInt(document.getElementById("amount").value);
  var receiver = document.getElementById("receiver").value;

  setStatus("Initiating transaction... (please wait)");

  meta.sendCoin(receiver, amount, {from: account}).then(function() {
    setStatus("Transaction complete!");
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    renderUserInfo()
    renderOwnGoals()
  });
}
