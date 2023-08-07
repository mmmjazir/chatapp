import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

// INTERNAL IMPORT
import { CheckIfWalletConnected,ConnectWallet,connectingWithContract  } from "../Utils/apiFeature";


export const ChatappContext = createContext();

export const ChatappContextProvider = ({children}) =>{
   // USESTATE
   const [account, setAccount] = useState('');
   const [userName, setUserName] = useState('');
   const [friendsList, setFriendsList] = useState([])
   const [friendMsg, setFriendMsg] = useState([])
   const [userLists, setUserLists] = useState([])
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState('')
   
  // CHAT USER DATA
  const [currentUserName, setCurrentUsername] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  // FECH DATA TIME OF PAGE LOAD
  const fetchData = async() => {
       try {
         const contract = await connectingWithContract();
       // GET ACCOUNT
        const connectAccount = await ConnectWallet();
        setAccount(connectAccount);
      //  GET USERNAME
       const name = await contract.userDetails(connectAccount)
       setUserName(name)
      //  GET ALL APP USERS
       const user_List = await contract.getAllUsers();
       setUserLists(user_List)

       //  GET MY FRIENDSLIST
       const friendList = await contract.getUserFriendsList();
        setFriendsList(friendList)
    
       } catch (error) {
        //  setError("Please Install And Connect Your Wallet")
        console.log(error)
       }

  }

  useEffect(()=>{
  
        fetchData();
      },[])
  


 const readMessage = async (friendAddress) =>{
   try {
      const contract = await connectingWithContract();
     const message = await contract.getChatHistory(friendAddress);
     setFriendMsg(message);
     
   } catch (error) {
      console.log('Currently you have no Message');
   }
 }

 const createAccount = async (name) =>{
    try {
      if(!name) {
        return setError("Name cannot be Empty ")
      }
      const contract = await connectingWithContract();
      const CreateUser = await contract.registerUser(name)
      setLoading(true);
      await CreateUser.wait();
      setLoading(false)
      window.location.reload();
    } catch (error) {
      setError("Error while creating your account Please reload browser")
    }
 }

 const addFriends = async (Address)=>{
   try {
      if(!Address){
        return setError('please provide the address to Add')
      }
      const contract = await connectingWithContract();
      const addMyFriend = await contract.addFriend(Address);
      setLoading(true)
      await addMyFriend.wait()
      setLoading(false)
     window.location.reload();

   } catch (error) {
      setError('Something went wrong while adding friends, try again')
   }
 }

 const removeFriend = async (Address)=>{
  try {
     if(!Address){
       return setError('please provide the address to remove from the friendslist')
     }
     const contract = await connectingWithContract();
     const removeMyFriend = await contract.removeFriend(Address);
     setLoading(true)
     await removeMyFriend.wait()
    setLoading(false)
    window.location.reload();

  } catch (error) {
     setError('Something went wrong while removing friends, try again')
  }
}

const areFriends = async (Address)=>{
  try {
     if(!Address){
       return setError('please provide the address to check the you are friends')
     }
     const contract = await connectingWithContract();
     const areMyFriend = await contract.areFriends(Address);
     return areMyFriend;
  } catch (error) {
     setError('Something went wrong while checking your friends, try again')
  }
}

 const sendMessage = async ({friendAddress,Message})=>{
     try {
      if(!friendAddress || !Message){
        return setError('Please Type your Message')
      }
      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(friendAddress,Message)
       setLoading(true);
       await addMessage.wait();
       setLoading(false);
       window.location.reload();
      
     } catch (error) {
      setError('Cant send message, Please reload and try again')
     }
 }

// READ INFO
const readUser = async (userAddress) =>{
   const contract = await connectingWithContract();
   const userName = await contract.userDetails(userAddress);
    setCurrentUsername(userName);
    setCurrentUserAddress(userAddress)
}

// DeleteAccount
const deleteAccount = async ()=>{
  try {
    const contract = await connectingWithContract();
    const deleteUser = await contract.unregisterUser()
    setLoading(true);
    await deleteUser.wait();
    setLoading(false)
    window.location.reload();
  } catch (error) {
    setError("Error while deleting your account Please reload browser")
  }
}


   return (
      <ChatappContext.Provider value={
         {readMessage,
          createAccount, 
          addFriends,
          removeFriend,
          areFriends,
          sendMessage, 
          readUser,
          ConnectWallet,
          CheckIfWalletConnected,
          deleteAccount,
          setLoading,
          account,
          userName,
          friendsList,
          friendMsg,
          userLists,
          loading,
          error,
          currentUserName,
          currentUserAddress
          }} >
        {children}
      </ChatappContext.Provider>
   )
}

