const Mining= artifacts.require("Mining");

module.exports = function (deployer) {
  console.log(deployer.deploy(Mining));
};
