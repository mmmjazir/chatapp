import Image from 'next/image';
import { useEffect,useState } from 'react';

// INTERNAL IMPORT
import Styles from './Usercard.module.css'
import images from '../../assets'

const Usercard = ({el, addFriends, removeFriend, areFriends}) => {
    const [isMyFriend, setIsMyFriend] = useState(null);

    const randomNumber = Math.floor(Math.random() * 10) + 1;
    useEffect(() => {
        const checkFriendStatus = async () => {
          try {
            const result = await areFriends(el.accountAddress);
            setIsMyFriend(result);
          } catch (error) {
            console.error(error);
          }
        };
    
        checkFriendStatus();
      }, [el.accountAddress]);


    return ( 
        <div className={Styles.Usercard}>
        <div className={Styles.Usercard_box}>
        <Image src={images[`image${randomNumber}`] } alt='user' width={100} height={100} />

        <div className={Styles.Usercard_box_info}>
            <h3>{el.name}</h3>
            <p>{el.accountAddress}..</p>
            { 
            isMyFriend ? (
                <button onClick={()=> removeFriend(el.accountAddress)}>
                 UnFriend
               </button>
            ) :(
                 <button onClick={()=> addFriends(el.accountAddress)}>
                Add Friend
            </button>
            )

            }
        </div>
          
        </div>
         
        </div>
     );
}
 
export default Usercard;