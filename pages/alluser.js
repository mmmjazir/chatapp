import { useState,useEffect, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';


// INTERNAL IMPORT
import { Usercard } from "../Components/index";
import Styles from '../styles/alluser.module.css';
import { ChatappContext } from "../Context/ChatappContext";
import { Loader } from '../Components/index';

const alluser = () => {
    const { userLists, addFriends, removeFriend, areFriends, loading } = useContext(ChatappContext)

    return ( 
        <div>
            <div className={Styles.alluser_info} >
                <h1>Find Your Friends</h1>
            </div>

            <div className={Styles.alluser}>
                {userLists.map((el)=>(
                      <Usercard key={uuidv4()} el={el} addFriends={addFriends} 
                       removeFriend={removeFriend} areFriends={areFriends}
                      />
                ))}

                {loading && <Loader/>}
            </div>
        </div>  

     );
}
 
export default alluser;