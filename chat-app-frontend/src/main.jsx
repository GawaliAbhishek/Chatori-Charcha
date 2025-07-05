import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './config/AppRoutes'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'react-hot-toast'
import { ChatProvider } from './context/chatContext.jsx'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <Toaster position='top-center'/>
     <ChatProvider>
       <AppRoutes />
     </ChatProvider>
    </BrowserRouter>

)
