import '../styles/globals.css'

// INTERNAL IMPORT
import { ChatappContextProvider } from '../Context/ChatappContext'
import { Navbar } from '../Components/index'

export default function App({ Component, pageProps }) {
  return (
    <div>
      <ChatappContextProvider>
         <Navbar/>
         <Component {...pageProps} />
      </ChatappContextProvider>
    </div>
  )
  
}
