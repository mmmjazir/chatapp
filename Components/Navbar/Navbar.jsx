import { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// INTERNAL IMPORT
import Styles from './Navbar.module.css';
import { ChatappContext } from '../../Context/ChatappContext';
import { Model, Error } from '../index';
import images from '../../assets';

const Navbar = () => {
  // USESTATE
  const [active, setActive] = useState(2);
  const [openModel, setOpenModel] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false)

  // CONTEXT
  const { account, userName, ConnectWallet, createAccount, error, deleteAccount } = useContext(ChatappContext);

  useEffect(() => {
    // Get active menu item based on the current URL
    const currentPath = window.location.pathname;
    if (currentPath === '/all-users') {
      setActive(1);
    } else if (currentPath === '/') {
      setActive(2);
    } else if (currentPath === '/settings') {
      setActive(3);
    } else if (currentPath === '/terms-of-use') {
      setActive(4);
    }
  }, []);

  return (
    <div className={Styles.Navbar}>
      <div className={Styles.Navbar_box}>
        <div className={Styles.Navbar_box_left}>
          <Image src={images.logo} alt='logo' width={50} height={50} />
        </div>

        <div className={Styles.Navbar_box_right}>
          <div className={Styles.Navbar_box_right_menu}>
            <Link href="/alluser" onClick={() => setActive(1)} className={active === 1 ? Styles.active : ''}>
              All Users
            </Link>

            <Link href="/" onClick={() => setActive(2)} className={active === 2 ? Styles.active : ''}>
              Chat
            </Link>

          </div>

          {/* CONNECT WALLET */}
          <div className={Styles.Navbar_box_right_connect}>
            {account === '' ? (
              <button onClick={()=> ConnectWallet()}>
                {""}
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button onClick={() => !userName ? setOpenModel(true) : setDeleteUser(true) }>
                <Image
                  src={userName ? images.accountName : images.create2}
                  alt="Account image"
                  width={20}
                  height={20}
                />
                {''}
                <small>{userName || 'Create Account'}</small>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* MODEL COMPONENT */}
      {openModel && (
        <div className={Styles.modelBox}>
          <Model
            openBox={setOpenModel}
            title="WELCOME TO"
            head="WEB3 CHATAPP"
            info="Register your Chat account here"
            smallInfo="Kindly type your name..."
            image={images.hero}
            functionName={createAccount}
            address={account}
            showNameInput={true}
            addFriendFunction={false}
          />
        </div>
      )}
      
      {deleteUser && (
        <div className={Styles.modelBox}>
          <Model
            openBox={setDeleteUser}
            title="Delete Your Chatapp Account"
            head=""
            info="Are you sure you want to delete?"
            smallInfo="(if you delete your account all you chat will disappear even after you register again)"
            image={images.hero}
            functionName={deleteAccount}
            address={account}
            showNameInput={false}
            addFriendFunction={false}
          />
        </div>
      )}

      {error == '' ? "" : <Error error={error} />}
    </div>
  );
};

export default Navbar;



