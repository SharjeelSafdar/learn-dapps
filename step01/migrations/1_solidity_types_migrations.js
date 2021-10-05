const SolidityTypes = artifacts.require("SolidityTypes");

module.exports = function (deployer) {
  deployer.deploy(SolidityTypes);
};
