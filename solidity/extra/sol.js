const Web3 = require("web3");
const fs = require("fs");

const ssafyProvider = new Web3.providers.HttpProvider("http://20.196.209.2:8545");
const localProvider = new Web3.providers.HttpProvider("http://localhost:7545");
const web3 = new Web3(ssafyProvider);

const MyTicketContractAddr = "0x92CE9828aA51cAC425Bb7de0E39bE0B21045E890";
const ShowScheduleManagerContractAddr = "0x92CE9828aA51cAC425Bb7de0E39bE0B21045E890";
const ProfileManagerContractAddr = "0x4EFd400dEb8bd2973c3aAc11D255A1F184374AcF";

const { abi: ProfileManagerContractABI } = JSON.parse(fs.readFileSync('./build/contracts/ProfileManager.json'));

const walletAddress = "0x72e342D7E5dDfc7aF7b6c470EeACe96b3B6c5679";
const privateKey = '0xd875895730fc3942b7342833cbc7e1dabcdbe1a18ae0b7d7d5989b59a37cca07';
const walletAccount = web3.eth.accounts.privateKeyToAccount(privateKey);

var ProfileManagerContractInstance = new web3.eth.Contract(ProfileManagerContractABI, ProfileManagerContractAddr);
var ProfileManagerMethodCreate = ProfileManagerContractInstance.methods.create('닉네임5', '굿잡', '헬로우', Date.now())
let encodedABI = ProfileManagerMethodCreate.encodeABI();
ProfileManagerMethodCreate.estimateGas({ from: walletAddress }, (error, gasEstimate) => {
    let tx = {
        from: walletAddress,
        to: ProfileManagerContractAddr,
        gas: gasEstimate,
        data: encodedABI,
    };

    walletAccount.signTransaction(tx).then((res) => {
        if (res == null) { console.log("Error!"); } 
        else {
            let tran = web3.eth.sendSignedTransaction(res.rawTransaction);
            tran.on('transactionHash', (txhash) => {
                console.log("Tx Hash: " + txhash);
            });
            tran.on('receipt', (receipt) => {
                console.log("Receipt: " + receipt);
            })
            tran.on('confirmation', (confirmationNumber, receipt) => { 
                console.log("Confirm #" + confirmationNumber);
                console.log("Confirm Receipt: " + receipt);
                
                if (confirmationNumber >= 3) tran.off('confirmation');
                ProfileManagerContractInstance.methods.Nickname(walletAddress).call().then(console.log);
                ProfileManagerContractInstance.methods.Description(walletAddress).call().then(console.log);
                ProfileManagerContractInstance.methods.ImageURI(walletAddress).call().then(console.log);
                ProfileManagerContractInstance.methods.CreatedAt(walletAddress).call().then(console.log);
             })
            tran.on('error', console.error); // If a out of gas error, the second parameter is the receipt.

        }
    });
});