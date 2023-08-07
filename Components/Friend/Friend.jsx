import { useState,useContext } from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

// INTERNAL IMPORT
import Styles from './Friend.module.css'
import images from '../../assets'
import Card from './Card/Card';
import Chat from './Chat/Chat';

import { ChatappContext } from '../../Context/ChatappContext';

const Friend = () => {
    const {sendMessage, 
        account,
        userName,
        friendsList,
        readMessage,
        friendMsg,
        loading,
        readUser,
        currentUserName,
        currentUserAddress} = useContext(ChatappContext)

    return ( 
        <div className={Styles.Friend}>
            <div className={Styles.Friend_box}>
                <div className={Styles.Friend_box_left}>
                  {friendsList.map((el)=>(
                    <Card key={uuidv4()} el={el} readMessage={readMessage} readUser={readUser} />
                  ))}
                </div>
                <div className={Styles.Friend_box_right}>
                    <Chat
                       functionName={sendMessage}
                       readMessage={readMessage}
                       friendMsg={friendMsg}
                       account={account}
                       userName={userName}
                       loading={loading}
                       currentUserAddress={currentUserAddress}
                       currentUserName={currentUserName}
                       readUser={readUser}
                    />
                </div>
            </div>
        </div>
     );
}
 
export default Friend;