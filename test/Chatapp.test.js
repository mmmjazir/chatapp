
const { expect } = require("chai");

describe("Chatapp", function() {
    
    let owner;
    let user1;
    let user2;
    let Chatapp;
  
    before(async function () {
        const [ownerSigner, user1Signer, user2Signer] = await ethers.getSigners();
        owner = ownerSigner;
        user1 = user1Signer;
        user2 = user2Signer;
        const ChatappFactory = await ethers.getContractFactory('Chatapp');
        Chatapp = await ChatappFactory.deploy();
        console.log("Deploying contracts with the account:", owner.address);
        console.log("Token address:", await Chatapp.getAddress());
    });
  
    it('should register a user', async function () {
        await Chatapp.connect(user1).registerUser('User1');
        const getUserDetails = await Chatapp.connect(user1).userDetails(user1.address);
        const allUsers = await Chatapp.connect(user1).getAllUsers();
        expect(allUsers[0].name).to.equal('User1');
        expect(getUserDetails).to.equal('User1');
    });

   it('should add a friend', async function(){
     await Chatapp.connect(user2).registerUser('User2');
     await Chatapp.connect(user1).addFriend(user2);
     const user1Friends = await Chatapp.connect(user1).getUserFriendsList();
     const user2Friends = await Chatapp.connect(user2).getUserFriendsList();
     expect(user1Friends[0].pubkey).to.equal(user2.address);
     expect(user2Friends[0].pubkey).to.equal(user1.address);
   })

   it('should send a message', async function(){
       await Chatapp.connect(user1).sendMessage(user2.address, "Hello!");
       const chatHistory = await Chatapp.connect(user1).getChatHistory(user2.address);
       expect(chatHistory.length).to.equal(1);
       expect(chatHistory[0].text).to.equal('Hello!');
       expect(chatHistory[0].sender).to.equal(user1.address);

   })

     it('should remove a friend', async function(){
     
    await Chatapp.connect(user1).removeFriend(user2.address);
    const user1Friends = await Chatapp.connect(user1).getUserFriendsList();
    const user2Friends = await Chatapp.connect(user2).getUserFriendsList();
    expect(user1Friends.length).to.equal(0);
    expect(user2Friends.length).to.equal(0);

  })



   it('should unregister a user', async function () {
    await Chatapp.connect(user1).unregisterUser();
    const allUsers = await Chatapp.connect(user1).getAllUsers();
    expect(allUsers[0].name).to.not.equal('User1');
  });



});
