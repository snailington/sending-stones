import {useEffect} from 'react'
import MessageBox from './MessageBox.tsx'
import {ChatInput} from "./ChatInput.tsx";
import ButtonBar from "./ButtonBar.tsx";
import {onConfigChange} from "./config.ts";
import OwlbearTheme from "./OwlbearTheme.tsx";
import OBR from "@owlbear-rodeo/sdk";
import './App.css'

function App() {
  useEffect(() => onConfigChange("windowSize", (size) => {
    OBR.action.setHeight(size == "small" ? 225 : 10000);
  }), []);

  return (
    <OwlbearTheme className="app-container">
        <ButtonBar />
        <MessageBox />
        <ChatInput />
    </OwlbearTheme>
  )
}

export default App
