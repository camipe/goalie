var accounts;
var account;
var balance;

function renderUserInfo() {
  var goalie = Goalie.deployed();
  goalie.getOwnUser.call({from: account}).then(function(user) {
    console.log(user);
    var userName = document.getElementById("userName");
    var userID = document.getElementById("userID");
    var userGoals = document.getElementById("userGoals");
    var trusteeGoals = document.getElementById("trusteeGoals");

    console.log(userName);
    console.log(userID);
    console.log(userGoals);
    console.log(trusteeGoals);

    userName.innerHTML = user[1];
    userID.innerHTML = user[0]
    userGoals.innerHTML = user[2];
    trusteeGoals.innerHTML = user[3];

  }).catch(function(e) {
    console.log(e);
  });

}

function renderOwnGoals() {

}

function renderOwnGoal() {

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
  });
}
