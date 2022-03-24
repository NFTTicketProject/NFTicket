const Web3 = require("web3");
const fs = require("fs");

// 네트워크 기본 설정
const ssafyProvider = new Web3.providers.HttpProvider("http://20.196.209.2:8545");
const localProvider = new Web3.providers.HttpProvider("http://localhost:7545");
const web3 = new Web3(localProvider);

// Contract sendTransaction 시 입력해야 할 것
// 1. 사피 지갑 정보 (walletAddress, privateKey)
// 2. 사피 네트워크에 배포한 계약 정보 (contractAddr, contractABI)
// 3. 실행할 메소드 정보 (contractMethod)
//

// 1. 사피 지갑 정보
// const walletAddress = "[사피 지갑주소: 0x1234...]"; 
// const privateKey = '[사피 지갑개인키: 0x1234...]';
const walletAddress = "0xA6eAD9a0a268666a90c3ce1B317C37321768Cd62";
const privateKey = '0x855d61de6f333bd8ba773867e011325c0cc302f41b01133282e3ec1d4cb63028';
const walletAddressCustomer = "0x46b2F06bBE857547BD30eA20652175BB5989e388";
const privateKeyCustomer = '0xfec74ebf23530e360b7dbc2a957f4f978e6457ff3bc72d58f1ee03e68c590166';

async function sendTransaction(walletAddress, privateKey, contractAddress, contractMethod, callback) {
    try {
        const walletAccount = web3.eth.accounts.privateKeyToAccount(privateKey);

        const contractMethodEncoded = contractMethod.encodeABI();
        const gasEstimate = await contractMethod.estimateGas({ from: walletAddress });
        
        const rawTx = {
            from: walletAddress,
            to: contractAddress,
            gas: gasEstimate,
            data: contractMethodEncoded,
        };
    
        walletAccount.signTransaction(rawTx).then((signedTx) => {
            if (signedTx == null) throw new Error("TransactionSignFailedException");

            let tran = web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            tran.on('transactionHash', (txhash) => { 
                console.log("Tx Hash: " + txhash)
                tran.off('transactionHash');
            });
            tran.on('receipt', (receipt) => console.log("Receipt: " + receipt));
            tran.on('confirmation', async (confirmationNumber, receipt) => {
                try {
                    // 3회 이상 컨펌시 더이상 Confirmation 이벤트 추적 안함
                    if (confirmationNumber > 0) {
                        tran.off('confirmation');
                        throw new Error("ConfirmCompletedException");
                    }

                    console.log("Confirm #" + confirmationNumber);
                    // console.log("Confirm Receipt: " + receipt);
                } catch (err) {
                    if (err instanceof TypeError) console.error('예외: 타입 에러', err);
                    if (err instanceof Error) {
                        if (err.message == "ConfirmCompletedException") {
                            console.log('예외: 컨펌 완료');
                            callback();
                        }
                        else console.error('예외: 알 수 없는 에러', err);
                    }
                }
            });
            tran.on('error', (error, receipt) => {
                if (receipt) throw new Error("OutOfGasException") 
                else new Error("UnknownErrorException");
            }); 
        })
        .catch(err => { throw err; } );
    } catch (err) {
        if (err instanceof Error) {
            if (err.message == "TransactionSignFailedException") console.error('예외: 트랜잭션 서명 실패', err);
            if (err.message == "OutOfGasException") console.error('예외: 가스 부족', err);
            if (err.message == "UnknownErrorException") console.error('예외: 알 수 없는 에러', err);
            else console.error('예외: 알 수 없는 에러', err);
        }
    }
};

// 2. 사피 네트워크에 배포한 계약 정보
// const contractAddr = "[배포한 계약 주소: 0x1234...]";
// const { abi: contractABI } = JSON.parse(fs.readFileSync('./build/contracts/[Truffle compile한 결과물].json'));
const NFTicketContractAddress = "0xf07e74320E4a42BACd89dCc7Aa821561Ed33a21D";
const { abi: NFTicketContractABI } = JSON.parse(fs.readFileSync('./build/contracts/NFTicket.json'));
const { abi: MyTicketContractABI } = JSON.parse(fs.readFileSync('./build/contracts/MyTicket.json'));
const { abi: ShowScheduleManagerContractABI } = JSON.parse(fs.readFileSync('./build/contracts/ShowScheduleManager.json'));
const { abi: TicketSaleManagerContractABI } = JSON.parse(fs.readFileSync('./build/contracts/TicketSaleManager.json'));

(async () => {
    const NFTicketContractInstance = new web3.eth.Contract(NFTicketContractABI, NFTicketContractAddress);

    const showScheduleManagerAddress = await NFTicketContractInstance.methods.getAddressOfShowScheduleManager().call();
    const showScheduleManagerContractInstance = new web3.eth.Contract(ShowScheduleManagerContractABI, showScheduleManagerAddress);
    
    // 1. 프론트에서 고객으로부터 백엔드로 발행 요청 전달 받음
    // 2. 백엔드 지갑에서 MyTicket에 접근해 티켓을 발급
    // 3. 백엔드에서 발급한 티켓을 거래글로 등록해서 프론트로 전달
    // 4. 고객이 거래글에 purchase 요청을 보냄 (Metamask 뜸)
    // 5. 백엔드로부터 고객에게 발급된 티켓을 양도
    // 6. 백엔드는 receipt 이벤트를 listen 하다가 성공하면 ShowSchedule로 접근해 발급한 티켓을 registerTicket
    // 7. 실패하면 nothing
    
    const showScheduleManagerCreate = showScheduleManagerContractInstance.methods.create(123, "stageName", 100, 300, 50, [1,2,3], [10,15,25]);
    sendTransaction(walletAddress, privateKey, showScheduleManagerAddress, showScheduleManagerCreate, async () => {
        const showScheduleIds = await showScheduleManagerContractInstance.methods.getShowSchedules(walletAddress).call();
        const newShowScheduleId = showScheduleIds[showScheduleIds.length - 1];

        console.log(`showScheduleIds: ${showScheduleIds}`);
        console.log(`newShowScheduleId: ${newShowScheduleId}`);
    
        const myTicketAddress = await NFTicketContractInstance.methods.getAddressOfMyTicket().call();
        const myTicketContractInstance = new web3.eth.Contract(MyTicketContractABI, myTicketAddress);
        
        const myTicketCreate = myTicketContractInstance.methods.create(walletAddressCustomer, "ticketURI", newShowScheduleId, 34, 15000, false, 30, 30000);
    
        sendTransaction(walletAddressCustomer, privateKeyCustomer, myTicketAddress, myTicketCreate, async () => {
            const ticketBalance = await myTicketContractInstance.methods.balanceOf(walletAddressCustomer).call();
            const newTicketId = await myTicketContractInstance.methods.tokenOfOwnerByIndex(walletAddressCustomer, ticketBalance - 1).call();
            
            const registerRow = 1;
            const registerColumn = 1;
           
            const showScheduleManagerRegisterTicket = showScheduleManagerContractInstance.methods.registerTicket(newShowScheduleId, registerRow, registerColumn, newTicketId);
        
            sendTransaction(walletAddress, privateKey, showScheduleManagerAddress, showScheduleManagerRegisterTicket, async () => {
                console.log('성공');
            });
        });
    });    
})();