import {useEffect, useState} from 'react'
import ChatBox from './ChatBox.tsx'
import './App.css'
import Loading from "./Loading.tsx";
import OBR from "@owlbear-rodeo/sdk";
import {ChatInput} from "./ChatInput.tsx";

function App() {
  const [obrReady, setObrReady] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("dark");
  
  useEffect(() => OBR.onReady(() => {
      OBR.theme.getTheme().then((theme) => {
        setCurrentTheme(theme.mode.toLowerCase());
        setObrReady(true);
      });
  }), []);

  useEffect(() => {
    console.log("hook", obrReady);
    if(!obrReady) return;
    return OBR.theme.onChange((theme) => {
      setCurrentTheme(theme.mode.toLowerCase());
    });
  }, [obrReady]);
  
  if(!obrReady) {
    return (
      <Loading/>
    );
  }

  return (
    <div className={`theme-${currentTheme}`}>
      <ChatBox />
      <ChatInput />
    </div>
  )
}

export default App
