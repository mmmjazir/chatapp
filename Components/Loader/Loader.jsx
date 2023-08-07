import Image from 'next/image';

// INTERNAL IMPORT
import Styles from './Loader.module.css'
import images from '../../assets' 

const Loader = () => {
    return ( 
        <div className={Styles.Loader}>
            <div className={Styles.Loader_box}>
                 <Image src={images.loader} alt='loader' height={100} width={100} />
            </div>
           
        </div>
     );
}
 
export default Loader;