module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.deploy(MetaCoin);
  deployer.deploy(Goalie);
  deployer.autolink();
};
