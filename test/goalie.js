/* eslint-disable */
var Goalie = artifacts.require("./Goalie.sol");

contract('Goalie', async (accounts) => { 

  let exGoal = {
    title: 'First test goal',
    desc: 'My goal is to create a goal',
    beneficiary: accounts[1],
    friends: [accounts[2], accounts[3]],
    deadline: 1530722452
  }

  // it("should put 10000 MetaCoin in the first account", async () => {
  //   let instance = await MetaCoin.deployed();
  //   let balance = await instance.getBalance.call(accounts[0]);
  //   assert.equal(balance.valueOf(), 10000);
  //  })

  // it("should call a function that depends on a linked library", async () => {
  //   let meta = await MetaCoin.deployed();
  //   let outCoinBalance = await meta.getBalance.call(accounts[0]);
  //   let metaCoinBalance = outCoinBalance.toNumber();
  //   let outCoinBalanceEth = await meta.getBalanceInEth.call(accounts[0]);
  //   let metaCoinEthBalance = outCoinBalanceEth.toNumber();
  //   assert.equal(metaCoinEthBalance, 2 * metaCoinBalance);

  // });

  it("...add new goal", async () => {
    let goalie = await Goalie.deployed();

    let addedGoal = await goalie.addGoal(exGoal.title, exGoal.desc, exGoal.beneficiary, exGoal.friends, exGoal.deadline, {from: accounts[0], value: web3.toWei(1, "ether")});

    let goal = await goalie.goals(0);

    console.log(goal);

    // return read of goals array
    assert.equal(exGoal.title === goal[0])
    assert.equal(exGoal.desc === goal[1])

  });

  it("...pay out to owner if approved and deadline has passed", function() {
  });

  it("...should pay out to beneficiary if approved and deadline has passed", function() {
  });

  it("...should pay out to owner if approved and deadline has NOT passed", function() {
  });

  it("...should NOT pay out to beneficiary if approved and deadline has NOT passed", function() {
  });

  it("...friend should be able to approve goal", function() {
  });

  it("...getGoalsByBeneficiary should return array of ids where address is beneficiary", function() {
  });

  it("...getGoalsByFriend should return array of ids where address is friend", function() {
  });

  it("...getGoalsByOwnery should return array of ids where address is owner", function() {
  });

  it("...should not pay out twice to owner", function() {
  });

  it("...should not pay out twice to beneficiary", function() {
  });
});
