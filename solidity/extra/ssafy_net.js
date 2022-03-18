const Web3 = require("web3");
const fs = require("fs");

// 네트워크 기본 설정
const ssafyProvider = new Web3.providers.HttpProvider("http://20.196.209.2:8545");
// const localProvider = new Web3.providers.HttpProvider("http://localhost:7545");
const web3 = new Web3(ssafyProvider);

// Contract sendTransaction 시 입력해야 할 것
// 1. 사피 지갑 정보 (walletAddress, privateKey)
// 2. 사피 네트워크에 배포한 계약 정보 (contractAddr, contractABI)
// 3. 실행할 메소드 정보 (contractMethod)
//

// 1. 사피 지갑 정보
// const walletAddress = "[사피 지갑주소: 0x1234...]"; 
// const privateKey = '[사피 지갑개인키: 0x1234...]';
const walletAddress = "0x";
const privateKey = '0x';

const walletAccount = web3.eth.accounts.privateKeyToAccount(privateKey);

// 2. 사피 네트워크에 배포한 계약 정보
// const contractAddr = "[배포한 계약 주소: 0x1234...]";
// const { abi: contractABI } = JSON.parse(fs.readFileSync('./build/contracts/[Truffle compile한 결과물].json'));
const contractAddr = "0x";
const { abi: contractABI } = JSON.parse(fs.readFileSync('./build/contracts/[].json'));

const contractInstance = new web3.eth.Contract(contractABI, contractAddr);

// 3. 실행할 메소드 정보
const contractMethod = contractInstance.methods.create('닉네임', '설명', '토큰URI', Date.now())
const contractEncodedMethod = contractMethod.encodeABI();

(async () => {
    try {
        const gasEstimate = await contractMethod.estimateGas({ from: walletAddress });
        
        const rawTx = {
            from: walletAddress,
            to: contractAddr,
            gas: gasEstimate,
            data: contractEncodedMethod,
        };
    
        walletAccount.signTransaction(rawTx).then((signedTx) => {
            if (signedTx == null) throw new Error("TransactionSignFailedException");

            let tran = web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            tran.on('transactionHash', (txhash) => { 
                console.log("Tx Hash: " + txhash)
                tran.off('transactionHash');
            });
            // tran.on('receipt', (receipt) => console.log("Receipt: " + receipt));
            tran.on('confirmation', async (confirmationNumber, receipt) => {
                try {
                    // 3회 이상 컨펌시 더이상 Confirmation 이벤트 추적 안함
                    if (confirmationNumber > 2) {
                        tran.off('confirmation');
                        throw new Error("ConfirmCompletedException");
                    }

                    console.log("Confirm #" + confirmationNumber);
                    // console.log("Confirm Receipt: " + receipt);

                    const Name = await contractInstance.methods.Nickname(walletAddress).call();
                    const TokenURI = await contractInstance.methods.ImageURI(walletAddress).call();

                    console.log(Name, TokenURI);
                } catch (err) {
                    if (err instanceof TypeError) console.error('예외: 타입 에러', err.message);
                    if (err instanceof Error) {
                        if (err.message == "ConfirmCompletedException") console.error('예외: 컨펌 완료');
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
            if (err.message == "TransactionSignFailedException") console.error('예외: 트랜잭션 서명 실패');
            if (err.message == "OutOfGasException") console.error('예외: 가스 부족');
            if (err.message == "UnknownErrorException") console.error('예외: 알 수 없는 에러');
            else console.error('예외: 알 수 없는 에러');
        }
    }
})();