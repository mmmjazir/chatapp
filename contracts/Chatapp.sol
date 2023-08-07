// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Chatapp {
    struct Message {
        string text;
        uint256 timestamp;
        address sender;
    }

    struct Friend {
        address pubkey;
        string name;
    }

    struct User {
        bool isRegistered;
        string name;
        Friend[] friends;
        mapping(address => bool) friendsContains;
        mapping(address => Message[]) chatHistory;
    }

    struct AllUserStruct {
        string name;
        address accountAddress;
    }

    mapping(address => User) private users;
    AllUserStruct[] private registeredUsers; // To store the names and addresses of all registered users
    address private owner;

    event FriendAdded(address indexed user, address indexed friend);
    event FriendRemoved(address indexed user, address indexed friend);
    event MessageSent(address indexed sender, address indexed receiver, string message, uint256 timestamp);
    event UserRegistered(address indexed user, string name);
    event UserUnregistered(address indexed user);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action.");
        _;
    }

    modifier onlyUser() {
        require(users[msg.sender].isRegistered, "You are not registered as a user.");
        _;
    }

    modifier onlyFriend(address _friend) {
        require(users[msg.sender].friendsContains[_friend], "You can only chat with friends.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerUser(string memory _name) external {
        require(!users[msg.sender].isRegistered, "User is already registered.");

        users[msg.sender].isRegistered = true;
        users[msg.sender].name = _name;
        registeredUsers.push(AllUserStruct(_name, msg.sender)); // Add the user's name and address to the list of registered users
        emit UserRegistered(msg.sender, _name);
    }

    function unregisterUser() external onlyUser {
        // Get the user's friends list before unregistering
        Friend[] memory userFriends = users[msg.sender].friends;

        // Remove the user from their friends' friend lists
        for (uint256 i = 0; i < userFriends.length; i++) {
            address friendAddress = userFriends[i].pubkey;
            removeFriend(friendAddress); // Call the removeFriend function
        }

        // Clear the user's friends array
        delete users[msg.sender].friends;

        // Clear the chat history with friends
        for (uint256 i = 0; i < userFriends.length; i++) {
            address friendAddress = userFriends[i].pubkey;
            delete users[msg.sender].chatHistory[friendAddress];
            delete users[friendAddress].chatHistory[msg.sender];
            users[friendAddress].friendsContains[msg.sender] = false;
        }

        // Remove user's address and name from the list of registered users
        for (uint256 i = 0; i < registeredUsers.length; i++) {
            if (registeredUsers[i].accountAddress == msg.sender) {
                registeredUsers[i] = registeredUsers[registeredUsers.length - 1];
                registeredUsers.pop();
                break;
            }
        }

        users[msg.sender].isRegistered = false;
        emit UserUnregistered(msg.sender);
    }

    function addFriend(address _friend) external onlyUser {
        require(_friend != msg.sender, "You cannot add yourself as a friend.");
        require(users[_friend].isRegistered, "The address provided is not a registered user.");
        require(!users[msg.sender].friendsContains[_friend], "Friend is already added.");

        string memory friendName = users[_friend].name; // Fetch the friend's name from the registered users
        users[msg.sender].friends.push(Friend(_friend, friendName));
        users[msg.sender].friendsContains[_friend] = true;
        users[_friend].friends.push(Friend(msg.sender, users[msg.sender].name));
        users[_friend].friendsContains[msg.sender] = true;

        emit FriendAdded(msg.sender, _friend);
    }

    function removeFriend(address _friend) public onlyUser {
        require(users[msg.sender].friendsContains[_friend], "Friend not found.");

        users[msg.sender].friendsContains[_friend] = false;
        _removeFriendFromArray(users[msg.sender].friends, _friend);

        users[_friend].friendsContains[msg.sender] = false;
        _removeFriendFromArray(users[_friend].friends, msg.sender);

        emit FriendRemoved(msg.sender, _friend);
    }

    function _removeFriendFromArray(Friend[] storage array, address friendAddress) private {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i].pubkey == friendAddress) {
                if (i < array.length - 1) {
                    array[i] = array[array.length - 1];
                }
                array.pop();
                break;
            }
        }
    }

    function sendMessage(address _friend, string memory _message) external onlyUser onlyFriend(_friend) {
        uint256 timestamp = block.timestamp;
        users[msg.sender].chatHistory[_friend].push(Message(_message, timestamp, msg.sender));
        users[_friend].chatHistory[msg.sender].push(Message(_message, timestamp, msg.sender));

        emit MessageSent(msg.sender, _friend, _message, timestamp);
    }

    function getChatHistory(address _friend) external view onlyUser onlyFriend(_friend) returns (Message[] memory) {
        return users[msg.sender].chatHistory[_friend];
    }

    function userDetails(address _user) external view returns (string memory) {
        require(users[_user].isRegistered, "User is not registered");
        return users[_user].name;
    }

    function getUserFriendsList() external view returns (Friend[] memory) {
        require(users[msg.sender].isRegistered, "User is not registered");
        return users[msg.sender].friends;
    }

    function areFriends(address _friend) external view returns (bool) {
        // Get the user's friends list
        Friend[] memory userFriends = users[msg.sender].friends;

        // Check if the given friend address exists in the friends list
        for (uint256 i = 0; i < userFriends.length; i++) {
            if (userFriends[i].pubkey == _friend) {
                return true;
            }
        }

        return false;
    }

    function getAllUsers() external view returns (AllUserStruct[] memory) {
        return registeredUsers;
    }
}
