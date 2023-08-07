import { useState,useContext } from 'react';
import Image from 'next/image';

// INTERNAL INPUT
import Styles from './Model.module.css'
import { ChatappContext } from '../../Context/ChatappContext';
import { Loader } from '../index';
import images from '../../assets'

const Model = ({ openBox,title,head,info,smallInfo,image,functionName, address, showNameInput, addFriendFunction}) => {

   // USESTATE
   const [name, setName] = useState("")
   const [friendAddress, setFriendAddress] = useState("")
   const {loading} = useContext(ChatappContext)

    return ( 
        <div className={Styles.Model}>
         <div className={Styles.Model_box}>
            <div className={Styles.Model_box_left}>
                <Image src={image} alt='register' width={700} height={700} />
            </div>
            <div className={Styles.Model_box_right}>
                 <h1>{title} <span>{head}</span> </h1>
                 <p>{info}</p>
                 <small>{smallInfo}</small>
                
          {
            loading == true ? (
                <Loader/>
              ):
      (
       <div className={Styles.Model_box_right_name}>
          {showNameInput &&
          <div className={Styles.Model_box_right_name_info}>
               <Image src={images.username} alt='user' width={30} height={30} />
               <input type='text' placeholder='your name' onChange={(e)=> setName(e.target.value)} />
          </div>
          }
          <div className={Styles.Model_box_right_name_info}>
               <Image src={images.account} alt='user' width={30} height={30} />
              {addFriendFunction ? <input type='text' value={friendAddress} onChange={(e)=> setFriendAddress(e.target.value) } placeholder='paste the address to add friends'  /> 
              
              : <input type='text' placeholder={address}  /> }
               
          </div>
          
          <div className={Styles.Model_box_right_name_btn}>
               
               {addFriendFunction ?  <button onClick={() => functionName(friendAddress) }>
                    {""}
                    <Image src={images.send} alt='send' height={30} width={30} />
                    {""}
                    Submit
               </button> 
               
               :  <button onClick={() => functionName(name) }>
                    {""}
                    <Image src={images.send} alt='send' height={30} width={30} />
                    {""}
                    Submit
               </button> }
              

               <button onClick={()=> openBox(false)}>
                    {""}
                    <Image src={images.close} alt='close' height={30} width={30} />
                    {""}
                    Cancel
               </button>
            </div>

            </div>
                  )
                }
         
     
        </div>
     </div>
     
</div>
     );
}
 
export default Model;



