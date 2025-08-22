import { ethers } from './ethers.esm.min.js';
import { abi, contractAddress } from './constants.js';

const connectButton = document.getElementById('connectButton');
const fundButton = document.getElementById('fundButton');
const balanceButton = document.getElementById('balanceButton');
const withdrawButton = document.getElementById('withdrawButton');
connectButton.addEventListener('click', connect);
fundButton.addEventListener('click', fund);
balanceButton.addEventListener('click', getBalance);
withdrawButton.addEventListener('click', withdraw);

async function withdraw() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const transactionResponse = await contract.withdraw();
    await listenForTransactionMine(transactionResponse, provider);
}

async function getBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    console.log(ethers.utils.formatEther(balance));
}

async function fund() {
    const ethAmount = "0.1";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount || '0.1')
    });
    await listenForTransactionMine(transactionResponse, provider);
}

function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}...`);
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(`Completed with ${transactionReceipt.confirmations} confirmations.`);
            resolve();
        });
    });
}

async function connect() {
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
            console.log(accounts);
        });
    } else {
        console.log('Please install MetaMask!');
    }
}