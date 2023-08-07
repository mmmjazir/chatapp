import { useState, useContext } from 'react';
import Image from 'next/image';

// INTERNAL IMPORT
import Styles from './Filter.module.css'
import images from '../../assets' 
import { ChatappContext } from '../../Context/ChatappContext';
import { Model } from '../index';


const Filter = () => {
    const {account,addFriends} = useContext(ChatappContext)
   
    // USESTATE
    const[addFriend, setAddFriend] = useState(false)

    return ( 
        <div className={Styles.Filter}>
            <div className={Styles.Filter_box}>
                  <div className={Styles.Filter_box_left} >
                     <div className={Styles.Filter_box_left_search}>
                        <Image src={images.search} alt='search-image' width={20} height={20} />
                        <input type="text" placeholder='search..' />
                     </div>
                  </div>  
                  <div className={Styles.Filter_box_right} >
                      <button>
                        <Image src={images.clear} alt='clear' width={20} height={20} />
                        CLEAR CHAT
                      </button>
                      <button onClick={()=> setAddFriend(true) }>
                        <Image src={images.user} alt='clear' width={20} height={20} />
                          ADD FRIEND
                      </button>
                  </div>  
            </div>
            
            {/* MODEL COMPONENT */}
           {addFriend && (
            <div className={Styles.Filter_model}>
               <Model openBox={setAddFriend} 
                  title="WELCOME TO"
                  head="CHAT BUDDY"
                  info="Do You Want To Add This User As Your Friend"
                  smallInfo="Click Submit to add Friend"
                  image={images.hero}
                  functionName={addFriends}
                  addFriendFunction={true}
                  showNameInput={false}
               />
            </div>
           )}

        </div>
     );
}
 
export default Filter;
<div>

</div>