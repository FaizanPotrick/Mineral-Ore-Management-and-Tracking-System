const GovernmentOfficials = artifacts.require("GovernmentOfficials");

module.exports = function (deployer) {
  console.log(deployer.deploy(GovernmentOfficials));
};
