import { useEffect, useState, useContext } from "react";

// INTERNAL IMPORT
// import { ChatappContext } from "../Context/ChatappContext";
import { Filter, Friend } from "../Components/index";

const Chatapp = () => {
   // const {} = useContext(ChatappContext)
 
  return ( 
     <div>
      <Filter/>
      <Friend/>
      </div>
   );
}
 
export default Chatapp;