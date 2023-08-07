import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// INTERNAL IMPORT
import Styles from './Card.module.css'
import images from '../../../assets'

const Card = ({readMessage, el, readUser}) => {

    return ( 
       
            <Link href={{pathname: '/', query:{name:`${el.name}`, address:`${el.pubkey}`} }} >

                  <div className={Styles.Card} onClick={() => (readMessage(el.pubkey), readUser(el.pubkey))} >
                    <div className={Styles.Card_box}>
                        <div className={Styles.Card_box_left}>
                            <Image src={images.accountName} 
                             alt='username' width={50}
                             height={50} className={Styles.Card_box_left_img} />
                        </div>
                        <div className={Styles.Card_box_right}>
                            <div className={Styles.Card_box_right_middle}>
                                <h4>{el.name}</h4>
                                <small>{el.pubkey}..</small>
                            </div>
                        </div>
                    </div>
                  </div>
            </Link>
    
     );
}
 
export default Card;
