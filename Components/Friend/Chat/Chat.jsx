import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

// INTERNAL IMPORT
import Styles from './Chat.module.css'
import images from '../../../assets'
import { convertTime } from '../../../Utils/apiFeature';
import { Loader } from '../../index';

const Chat = ({ 
    functionName,
    readMessage,
    friendMsg,
    userName,
    loading,
    currentUserAddress,
    currentUserName,
    readUser}) => {

     // USESTATE
     const [message, setMessage] = useState('');
     const[chatData, setChatData] = useState({name:"", address:""})


    const router = useRouter()


    useEffect(()=>{
        if(!router.isReady) return;
        setChatData(router.query)
        
    },[router.isReady]);

    useEffect(()=>{
        if(chatData.address){
          readMessage(router.query.address)
          readUser(router.query.address)
        }
    },[message])


    return ( 
        <div className={Styles.Chat}>
            {currentUserAddress && currentUserAddress ? (
               <div className={Styles.Chat_user_info}>
                    <Image src={images.accountName} alt='image' width={70} height={70} />
                    <div className={Styles.Chat_user_info_box}>
                       <h4>{currentUserName}</h4>
                       <p className={Styles.show}>{currentUserAddress}</p>
                    </div>
               </div>
            ): (
                ""
            )}
            <div className={Styles.Chat_box_box}>
                 <div className={Styles.Chat_box}>
                    <div className={Styles.Chat_box_left}>
                        {
                            friendMsg.map((el)=>(
                         <div key={uuidv4()} >
                            {el.sender == chatData.address ? (
                                <div className={Styles.Chat_box_left_title}>
                                <Image src={images.accountName} alt='image' width={50} height={50} />
                                <span>
                                    {chatData.name} {""}
                                    <small>Time: {convertTime(el.timestamp)}</small>
                                </span>
                             </div>
                            ) : (
                                <div className={Styles.Chat_box_left_title}>
                                <Image src={images.accountName} alt='image' width={50} height={50} />
                                <span>
                                    {userName} {""}
                                    <small>Time: {convertTime(el.timestamp)}</small>
                                </span>
                             </div>  
                              
                            )}
                             <p>{el.text} 
                             {""} 
                             {""} 
                             </p>
                         </div>
                         ) )
                        }
                    </div>
                 </div>
               {currentUserAddress && currentUserName ? (
                  <div className={Styles.Chat_box_send}>
                      <div className={Styles.Chat_box_send_img}>
                        <Image src={images.smile} alt='smile' width={50} height={50} />
                        <input type="text" placeholder='type your message' value={message} onChange={(e)=> setMessage(e.target.value)} />
                        <Image src={images.file} alt='file' width={50} height={50} />
                        {
                            loading == true ? (
                                <Loader/>
                            ) :(
                                <Image src={images.send} alt='send' height={50} width={50} onClick={()=> {
                                    functionName({Message:message,friendAddress:chatData.address}) ;
                                    setMessage('');
                                }
                                }
                                    />
                            )
                        }
                      </div>
                  </div>
               ) : (
                ""
               )} 
               
            </div>
        </div>
     );
}
 
export default Chat;