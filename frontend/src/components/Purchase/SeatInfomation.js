// const Web3 = require("web3");
// const fs = require("fs");
// const axios = require("axios");

// // 네트워크 기본 설정
// const ssafyProvider = new Web3.providers.HttpProvider("http://20.196.209.2:8545");
// //const localProvider = new Web3.providers.HttpProvider("http://localhost:7545");
// const web3 = new Web3(ssafyProvider);

// // Contract sendTransaction 시 입력해야 할 것
// // 1. 사피 지갑 정보 (walletAddress, privateKey)
// // 2. 사피 네트워크에 배포한 계약 정보 (contractAddr, contractABI)
// // 3. 실행할 메소드 정보 (contractMethod)
// //

// // 1. 사피 지갑 정보
// // const walletAddress = "[사피 지갑주소: 0x1234...]"; 
// // const privateKey = '[사피 지갑개인키: 0x1234...]';
// const walletAddress = "0xA6eAD9a0a268666a90c3ce1B317C37321768Cd62";
// const privateKey = '0x855d61de6f333bd8ba773867e011325c0cc302f41b01133282e3ec1d4cb63028';
// const walletAddressCustomer = "0x46b2F06bBE857547BD30eA20652175BB5989e388";
// const privateKeyCustomer = '0xfec74ebf23530e360b7dbc2a957f4f978e6457ff3bc72d58f1ee03e68c590166';

// async function sendTransaction(walletAddress, privateKey, contractAddress, contractMethod, callback) {
//     try {
//         const walletAccount = web3.eth.accounts.privateKeyToAccount(privateKey);

//         const contractMethodEncoded = contractMethod.encodeABI();
//         const gasEstimate = await contractMethod.estimateGas({ from: walletAddress });
        
//         const rawTx = {
//             from: walletAddress,
//             to: contractAddress,
//             gas: gasEstimate,
//             data: contractMethodEncoded,
//         };
    
//         walletAccount.signTransaction(rawTx).then((signedTx) => {
//             if (signedTx == null) throw new Error("TransactionSignFailedException");

//             let tran = web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//             tran.on('transactionHash', (txhash) => { 
//                 console.log("Tx Hash: " + txhash)
//                 tran.off('transactionHash');
//             });
//             tran.on('receipt', (receipt) => console.log("Receipt: " + receipt));
//             tran.on('confirmation', async (confirmationNumber, receipt) => {
//                 try {
//                     // 3회 이상 컨펌시 더이상 Confirmation 이벤트 추적 안함
//                     if (confirmationNumber > 0) {
//                         tran.off('confirmation');
//                         throw new Error("ConfirmCompletedException");
//                     }

//                     console.log("Confirm #" + confirmationNumber);
//                     // console.log("Confirm Receipt: " + receipt);
//                 } catch (err) {
//                     if (err instanceof TypeError) console.error('예외: 타입 에러', err);
//                     if (err instanceof Error) {
//                         if (err.message == "ConfirmCompletedException") {
//                             console.log('예외: 컨펌 완료');
//                             callback();
//                         }
//                         else console.error('예외: 알 수 없는 에러', err);
//                     }
//                 }
//             });
//             tran.on('error', (error, receipt) => {
//                 if (receipt) throw new Error("OutOfGasException") 
//                 else new Error("UnknownErrorException");
//             }); 
//         })
//         .catch(err => { throw err; } );
//     } catch (err) {
//         if (err instanceof Error) {
//             if (err.message == "TransactionSignFailedException") console.error('예외: 트랜잭션 서명 실패', err);
//             if (err.message == "OutOfGasException") console.error('예외: 가스 부족', err);
//             if (err.message == "UnknownErrorException") console.error('예외: 알 수 없는 에러', err);
//             else console.error('예외: 알 수 없는 에러', err);
//         }
//     }
// };

// // 2. 사피 네트워크에 배포한 계약 정보
// // const contractAddr = "[배포한 계약 주소: 0x1234...]";
// // const { abi: contractABI } = JSON.parse(fs.readFileSync('./build/contracts/[Truffle compile한 결과물].json'));
// const myTicketContractAddr = "0xab39e34d46524d74adea79986FA1c6F152103A64";
// const showScheduleManagerContractAddr = "0xB3ab48589a480575c09A94E3776800D6d6CEC4A3";
// const ticketSaleManagerContractAddr = "0x75A989b082297E3a3315e5F6733F307df31dB793";

// const { abi: MyTicketContractABI } = JSON.parse(fs.readFileSync('./build/contracts/MyTicket.json'));
// const { abi: ShowScheduleContractABI } = JSON.parse(fs.readFileSync('./build/contracts/ShowSchedule.json'));
// const { abi: ShowScheduleManagerContractABI } = JSON.parse(fs.readFileSync('./build/contracts/ShowScheduleManager.json'));
// const { abi: TicketSaleManagerContractABI } = JSON.parse(fs.readFileSync('./build/contracts/TicketSaleManager.json'));

// // 3. 로직 실행
// (async () => {
//     // ABI와 CA를 가지고 Web3 Contract Object를 만듭니다
//     const showScheduleManagerContractInstance = new web3.eth.Contract(ShowScheduleManagerContractABI, showScheduleManagerContractAddr);
    
//     // Contract 상에 등록된 공연 스케줄 개수를 가져옵니다
//     const showScheduleCount = await showScheduleManagerContractInstance.methods.getCount().call();
//     const showScheduleContracts = []
//     let showSchedules = {}

//     // 각 공연 스케줄의 정보를 가져옵니다
//     for (var i = 1; i <= showScheduleCount; i++)
//     {
//         const ShowScheduleContractAddr = await showScheduleManagerContractInstance.methods.getShowSchedule(i).call();
//         const ShowScheduleContractInstance = new web3.eth.Contract(ShowScheduleContractABI, ShowScheduleContractAddr);
//         showScheduleContracts.push(ShowScheduleContractInstance);

//         let showSchedule = {}
//         showSchedule.address = ShowScheduleContractAddr;
//         showSchedule.showId = await ShowScheduleContractInstance.methods.getShowId().call();
//         showSchedule.stageName = await ShowScheduleContractInstance.methods.getStageName().call();
//         showSchedule.startedAt = await ShowScheduleContractInstance.methods.getStartedAt().call();
//         showSchedule.endedAt = await ShowScheduleContractInstance.methods.getEndedAt().call();
//         showSchedule.maxMintCount = await ShowScheduleContractInstance.methods.getMaxMintCount().call();
//         const resellPolicy = await ShowScheduleContractInstance.methods.getResellPolicy().call();
//         showSchedule.resellPolicy = {
//             isAvailable: resellPolicy[0],
//             royaltyRatePercent: resellPolicy[1],
//             priceLimit: resellPolicy[2]
//         }
//         showSchedule.ticketClasses = []
//         const ticketClassCount = await ShowScheduleContractInstance.methods.getTicketClassCount().call();
//         for (var j = 0; j < ticketClassCount; j++)
//         {
//             var ticketClass = {
//                 name: await ShowScheduleContractInstance.methods.getTicketClassName(j).call(),
//                 price: await ShowScheduleContractInstance.methods.getTicketClassPrice(j).call(),
//                 maxMintCount: await ShowScheduleContractInstance.methods.getTicketClassMaxMintCount(j).call(),
//             }

//             showSchedule.ticketClasses.push(ticketClass)
//         }
//         showSchedules[i] = showSchedule
//     }

// // 윗부분에 필요없는 코드가 많이 들어있어서 이부분 부터 진짜라고 보시면 됩니다
// // 등록된 모든 공연 스케줄에 대해 각 스케줄(공연장) 마다 루프를 돌려 빈 좌석을 찾아옵니다.
// // 실사용시에는 1개 스케줄에 대해 돌기 때문에 이것 보단 빠를 것 같아요
//     currentSeats = {}
//     for (var key of Object.keys(showSchedules))
//     {
//         const ShowScheduleContractAddr = showSchedules[key].address;
//         const ShowScheduleContractInstance = new web3.eth.Contract(ShowScheduleContractABI, ShowScheduleContractAddr);
        
//         for (var i = 0; i < showSchedules[key].ticketClasses.length; i++)
//         {
//             currentSeatsOfClass = {}
//             for (var [idx, ticketClass] of showSchedules[key].ticketClasses.entries())
//             {
//                 currentSeatsOfClass[ticketClass.name] = []
//                 for (var j = 0; j < ticketClass.maxMintCount; j++)
//                 {
//                     currentSeatsOfClass[ticketClass.name].push(await ShowScheduleContractInstance.methods.getTicketId(idx, j).call())
//                 }
//             }
//             currentSeats[showSchedules[key].stageName] = currentSeatsOfClass;
//         }
//     }

//     console.log(currentSeats)
// })();