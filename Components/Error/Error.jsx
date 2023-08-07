import Styles from './Error.module.css'

const Error = ({error}) => {
    return ( 
   
        <div  className={Styles.Error} >
          <div className={Styles.Error_box}>
             <h1>Please Fix This Error & Reload Browser</h1>
             {error}
          </div>
        </div>
     );
}
 
export default Error;