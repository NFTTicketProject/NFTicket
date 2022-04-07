// const Migrations = artifacts.require("Migrations");

// module.exports = function (deployer) {
//   deployer.deploy(Migrations);
// };

const SSAFYToken = artifacts.require("SsafyToken");
const MyTicket = artifacts.require("MyTicket");
const ShowScheduleManager = artifacts.require("ShowScheduleManager");
const TicketSaleManager = artifacts.require("TicketSaleManager");

module.exports = async function (deployer) {
  await deployer.deploy(SSAFYToken, "SSAFY Token", "SSF");
  await deployer.deploy(MyTicket);
  await deployer.deploy(ShowScheduleManager, SSAFYToken.address, MyTicket.address);
  await deployer.deploy(TicketSaleManager, ShowScheduleManager.address, SSAFYToken.address, MyTicket.address);
};