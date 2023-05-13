import {useEffect, useState} from 'react'
import ChatBox from './ChatBox.tsx'
import './App.css'
import Loading from "./Loading.tsx";
import OBR from "@owlbear-rodeo/sdk";

function App() {
  const [obrReady, setObrReady] = useState(false);
  
  useEffect(() => {
    OBR.onReady(() => {
      setObrReady(true);
    })
  }, []);
  
  if(!obrReady) {
    return (
      <Loading/>
    );
  }
  
  return (
    <>
      <ChatBox />
    </>
  )
}

export default App
