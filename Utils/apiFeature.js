import { ethers } from 'ethers';
import { ChatappAddress, ChatappABI } from '../Context/constants';



export const CheckIfWalletConnected = async () => {
  try {
    if (!window.ethereum) {
      console.log('Install Metamask');
      return null;
    }
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log('Error checking wallet connection:', error);
    return null;
  }
};



export const ConnectWallet = async () => {
  try {
    if (!window.ethereum) {
      console.log('Install Metamask');
      return null;
    }
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log('Error connecting wallet:', error);
    return null;
  }
};

const fetchContract = (signerOrProvider) => new ethers.Contract(ChatappAddress, ChatappABI, signerOrProvider);

export const connectingWithContract = async () => {
  // try {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);

  //   const signer = provider.getSigner();
  //   const contract = fetchContract(signer);

  //   return contract;
  // } catch (error) {
  //   console.log('Error connecting with contract:', error);
  //   return null;
  // }

  let signer = null;

let provider;

if (window.ethereum == null) {

    console.log("MetaMask not installed; using read-only defaults")
    provider = ethers.getDefaultProvider()

} else {

    provider = new ethers.BrowserProvider(window.ethereum)
    signer = await provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
}
};


export const convertTime = (unixTimestamp) => {
  const timestampInMilliseconds = Number(BigInt(unixTimestamp) * 1000n);
  const utcTime = new Date(timestampInMilliseconds);

  // Calculate IST offset in minutes
  const istOffsetMinutes = 330; // IST is UTC+5:30
  const istTime = new Date(utcTime.getTime() + istOffsetMinutes * 60 * 1000);

  // Format IST time as a string in 12-hour format (AM/PM)
  const hours = istTime.getUTCHours();
  const minutes = istTime.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  const formattedTime =
    istTime.getUTCFullYear() +
    '-' +
    ('0' + (istTime.getUTCMonth() + 1)).slice(-2) +
    '-' +
    ('0' + istTime.getUTCDate()).slice(-2) +
    ' ' +
    ('0' + formattedHours).slice(-2) +
    ':' +
    ('0' + minutes).slice(-2) +
    ' ' +
    ampm;

  return formattedTime;
};






// export const convertTime = (time) => {
//   // Function to convert time
//   const newTime =  new Date(time.toNumber());
//   const realTime =
//     newTime.getHours() +
//     '/' +
//     newTime.getMinutes() +
//     '/' +
//     newTime.getSeconds() +
//     '  Date:' +
//     newTime.getDate() +
//     '/' +
//     (newTime.getMonth() + 1) +
//     '/' +
//     newTime.getFullYear();
//   return realTime;
// };

