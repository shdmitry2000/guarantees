var GuaranteeConst = artifacts.require("./GuaranteeConst.sol");
// var GuaranteeExtender = artifacts.require("./GuaranteeExtender.sol");
// var GuaranteeRequestExtender = artifacts.require("./GuaranteeRequestExtender.sol");
var DigitalGuaranteeBNHP = artifacts.require("./DigitalGuaranteeBNHP.sol");
var GuaranteeRequest = artifacts.require("./GuaranteeRequest.sol");
var Regulator = artifacts.require("./Regulator.sol");

// var Registry = artifacts.require("./Registry.sol");

module.exports = function(deployer) {
  // deployer.deploy(GuaranteeConst);
  // deployer.deploy(DigitalGuaranteeBNHP);
  // deployer.deploy(GuaranteeRequest);
  // deployer.deploy(GuaranteeRequestExtender);
  // deployer.deploy(DigitalGuaranteeBNHP);
  // deployer.deploy(GuaranteeRequest);
  deployer.deploy(Regulator ,{gas: 5918507});
};
