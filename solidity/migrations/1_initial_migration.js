// const Migrations = artifacts.require("Migrations");

// module.exports = function (deployer) {
//   deployer.deploy(Migrations);
// };

const MyTicket = artifacts.require("MyTicket");
const ShowSchedule = artifacts.require("ShowSchedule");
//const ShowScheduleManager = artifacts.require("ShowScheduleManager");

module.exports = function (deployer) {
  deployer.deploy(MyTicket);
  //uint256 showId, uint256 stageId, uint256 startedAt, uint256 endedAt, uint256 totalMintCount
  deployer.deploy(ShowSchedule, 1, 2, 1234567890, 9876543210, 50);
//  deployer.deploy(ShowScheduleManager);
};
