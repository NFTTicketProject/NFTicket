// const Migrations = artifacts.require("Migrations");

// module.exports = function (deployer) {
//   deployer.deploy(Migrations);
// };

const NFTicket = artifacts.require("NFTicket");

module.exports = function (deployer) {
  deployer.deploy(NFTicket);
};
