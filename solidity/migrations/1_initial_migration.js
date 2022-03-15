// const Migrations = artifacts.require("Migrations");

// module.exports = function (deployer) {
//   deployer.deploy(Migrations);
// };

const MyTicket = artifacts.require("MyTicket");
const ShowScheduleManager = artifacts.require("ShowScheduleManager");

module.exports = function (deployer) {
  deployer.deploy(MyTicket);
  deployer.deploy(ShowScheduleManager);
};
