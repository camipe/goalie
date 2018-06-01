var GoalFactory = artifacts.require("GoalFactory");

module.exports = function(deployer) {
  deployer.deploy(GoalFactory);
};
